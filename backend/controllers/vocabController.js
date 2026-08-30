import { getPool, getStatus, seedDefaultData, getMemoryStore, saveMemoryStore, loadMemoryData } from '../config/db.js';

export const getVocabularies = async (req, res) => {
  try {
    const pool = await getPool();
    let {
      q = '',
      unit = 'all',
      category = 'all',
      word_type = 'all',
      status = 'all',
      page = 1,
      limit = 12,
      sort_by = 'id',
      order = 'ASC'
    } = req.query;

    page = Math.max(1, parseInt(page, 10) || 1);
    limit = Math.min(2000, Math.max(1, parseInt(limit, 10) || 12));
    const offset = (page - 1) * limit;

    if (pool) {
      const whereConditions = [];
      const params = [];

      if (q && q.trim() !== '') {
        const searchTerm = `%${q.trim()}%`;
        whereConditions.push(`(
          word LIKE ? OR 
          meaning_vi LIKE ?
        )`);
        params.push(searchTerm, searchTerm);
      }

      if (unit && unit !== 'all') {
        whereConditions.push('unit = ?');
        params.push(parseInt(unit, 10));
      }

      if (category && category !== 'all') {
        whereConditions.push('category = ?');
        params.push(category);
      }

      if (word_type && word_type !== 'all') {
        whereConditions.push('word_type = ?');
        params.push(word_type);
      }

      if (status && status !== 'all') {
        whereConditions.push('status = ?');
        params.push(status);
      }

      const whereSql = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
      const allowedSortCols = ['id', 'word_number', 'word', 'unit', 'created_at', 'status', 'word_type'];
      const safeSortBy = allowedSortCols.includes(sort_by) ? sort_by : 'id';
      const safeOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

      const countSql = `SELECT COUNT(*) as total FROM vocabularies ${whereSql}`;
      const [countResult] = await pool.query(countSql, params);
      const total = countResult[0].total;

      const dataSql = `
        SELECT * FROM vocabularies 
        ${whereSql} 
        ORDER BY ${safeSortBy} ${safeOrder} 
        LIMIT ? OFFSET ?
      `;
      const queryParams = [...params, limit, offset];
      const [rows] = await pool.query(dataSql, queryParams);
      const totalPages = Math.ceil(total / limit) || 1;

      return res.json({
        success: true,
        data: rows,
        pagination: { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
        filters: { q, unit, category, word_type, status, sort_by: safeSortBy, order: safeOrder },
        dbMode: 'mysql'
      });
    }

    // Fallback
    let list = [...getMemoryStore()];

    if (q && q.trim() !== '') {
      const term = q.trim().toLowerCase();
      list = list.filter(item => 
        (item.word && item.word.toLowerCase().includes(term)) ||
        (item.meaning_vi && item.meaning_vi.toLowerCase().includes(term))
      );
    }

    if (unit && unit !== 'all') {
      list = list.filter(item => String(item.unit) === String(unit));
    }
    if (category && category !== 'all') {
      list = list.filter(item => item.category === category);
    }
    if (word_type && word_type !== 'all') {
      list = list.filter(item => item.word_type === word_type);
    }
    if (status && status !== 'all') {
      list = list.filter(item => item.status === status);
    }

    list.sort((a, b) => {
      let valA = a[sort_by] || '';
      let valB = b[sort_by] || '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (order.toUpperCase() === 'DESC') {
        return valA < valB ? 1 : (valA > valB ? -1 : 0);
      }
      return valA > valB ? 1 : (valA < valB ? -1 : 0);
    });

    const total = list.length;
    const paginatedItems = list.slice(offset, offset + limit);
    const totalPages = Math.ceil(total / limit) || 1;

    res.json({
      success: true,
      data: paginatedItems,
      pagination: { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
      filters: { q, unit, category, word_type, status, sort_by, order },
      dbMode: 'fallback_preview'
    });
  } catch (error) {
    console.error('Error in getVocabularies:', error);
    res.status(500).json({ success: false, message: 'Lỗi truy vấn dữ liệu: ' + error.message });
  }
};

export const getVocabularyById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getPool();

    if (pool) {
      const [rows] = await pool.query('SELECT * FROM vocabularies WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy từ vựng này.' });
      }
      return res.json({ success: true, data: rows[0] });
    }

    const item = getMemoryStore().find(i => String(i.id) === String(id));
    if (!item) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy từ vựng này.' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error in getVocabularyById:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy chi tiết: ' + error.message });
  }
};

export const createVocabulary = async (req, res) => {
  try {
    const {
      word,
      phonetic = '',
      word_type = 'noun',
      meaning_vi,
      sound_bridge = '',
      definition_en = '',
      example_en = '',
      example_vi = '',
      unit = 1,
      unit_title = '',
      category = 'General',
      page_number = null,
      image_url = '',
      status = 'new',
      note = ''
    } = req.body;

    if (!word || !word.trim()) {
      return res.status(400).json({ success: false, message: 'Từ vựng tiếng Anh không được để trống.' });
    }

    if (!meaning_vi || !meaning_vi.trim()) {
      return res.status(400).json({ success: false, message: 'Nghĩa tiếng Việt không được để trống.' });
    }

    const pool = await getPool();

    if (pool) {
      const [maxNum] = await pool.query('SELECT MAX(word_number) as maxNum FROM vocabularies');
      const word_number = (maxNum[0].maxNum || 0) + 1;

      const insertSql = `
        INSERT INTO vocabularies (
          word_number, word, phonetic, word_type, meaning_vi, sound_bridge,
          definition_en, example_en, example_vi, unit, unit_title, category,
          page_number, image_url, status, note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await pool.query(insertSql, [
        word_number,
        word.trim(),
        phonetic.trim(),
        word_type.trim() || 'noun',
        meaning_vi.trim(),
        sound_bridge.trim(),
        definition_en.trim(),
        example_en.trim(),
        example_vi.trim(),
        parseInt(unit, 10) || 1,
        unit_title.trim() || `Unit ${unit || 1}`,
        category.trim() || 'General',
        page_number ? parseInt(page_number, 10) : null,
        image_url.trim() || null,
        status || 'new',
        note.trim() || null
      ]);

      const [newRecord] = await pool.query('SELECT * FROM vocabularies WHERE id = ?', [result.insertId]);

      return res.status(201).json({
        success: true,
        message: 'Thêm mới từ vựng vào MySQL thành công!',
        data: newRecord[0]
      });
    }

    const store = getMemoryStore();
    const newId = store.length > 0 ? Math.max(...store.map(s => s.id)) + 1 : 1;
    const newRecord = {
      id: newId,
      word_number: newId,
      word: word.trim(),
      phonetic: phonetic.trim(),
      word_type: word_type.trim() || 'noun',
      meaning_vi: meaning_vi.trim(),
      sound_bridge: sound_bridge.trim(),
      definition_en: definition_en.trim(),
      example_en: example_en.trim(),
      example_vi: example_vi.trim(),
      unit: parseInt(unit, 10) || 1,
      unit_title: unit_title.trim() || `Unit ${unit || 1}`,
      category: category.trim() || 'General',
      page_number: page_number ? parseInt(page_number, 10) : null,
      image_url: image_url.trim() || null,
      status: status || 'new',
      note: note.trim() || null,
      created_at: new Date().toISOString()
    };
    store.unshift(newRecord);
    saveMemoryStore(store);

    res.status(201).json({
      success: true,
      message: 'Thêm mới từ vựng thành công!',
      data: newRecord
    });
  } catch (error) {
    console.error('Error in createVocabulary:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tạo từ vựng: ' + error.message });
  }
};

export const updateVocabulary = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getPool();

    const {
      word,
      phonetic,
      word_type,
      meaning_vi,
      sound_bridge,
      definition_en,
      example_en,
      example_vi,
      unit,
      unit_title,
      category,
      page_number,
      image_url,
      status,
      note
    } = req.body;

    if (pool) {
      const [existing] = await pool.query('SELECT * FROM vocabularies WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy từ vựng để cập nhật.' });
      }

      const current = existing[0];
      const updateSql = `
        UPDATE vocabularies SET
          word = ?, phonetic = ?, word_type = ?, meaning_vi = ?, sound_bridge = ?,
          definition_en = ?, example_en = ?, example_vi = ?, unit = ?, unit_title = ?,
          category = ?, page_number = ?, image_url = ?, status = ?, note = ?
        WHERE id = ?
      `;

      await pool.query(updateSql, [
        word !== undefined ? word.trim() : current.word,
        phonetic !== undefined ? phonetic.trim() : current.phonetic,
        word_type !== undefined ? word_type.trim() : current.word_type,
        meaning_vi !== undefined ? meaning_vi.trim() : current.meaning_vi,
        sound_bridge !== undefined ? sound_bridge.trim() : current.sound_bridge,
        definition_en !== undefined ? definition_en.trim() : current.definition_en,
        example_en !== undefined ? example_en.trim() : current.example_en,
        example_vi !== undefined ? example_vi.trim() : current.example_vi,
        unit !== undefined ? parseInt(unit, 10) : current.unit,
        unit_title !== undefined ? unit_title.trim() : current.unit_title,
        category !== undefined ? category.trim() : current.category,
        page_number !== undefined ? (page_number ? parseInt(page_number, 10) : null) : current.page_number,
        image_url !== undefined ? image_url.trim() : current.image_url,
        status !== undefined ? status : current.status,
        note !== undefined ? note.trim() : current.note,
        id
      ]);

      const [updated] = await pool.query('SELECT * FROM vocabularies WHERE id = ?', [id]);
      return res.json({ success: true, message: 'Cập nhật từ vựng thành công!', data: updated[0] });
    }

    const store = getMemoryStore();
    const idx = store.findIndex(s => String(s.id) === String(id));
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy từ vựng.' });
    }

    store[idx] = {
      ...store[idx],
      word: word !== undefined ? word.trim() : store[idx].word,
      phonetic: phonetic !== undefined ? phonetic.trim() : store[idx].phonetic,
      word_type: word_type !== undefined ? word_type.trim() : store[idx].word_type,
      meaning_vi: meaning_vi !== undefined ? meaning_vi.trim() : store[idx].meaning_vi,
      sound_bridge: sound_bridge !== undefined ? sound_bridge.trim() : store[idx].sound_bridge,
      definition_en: definition_en !== undefined ? definition_en.trim() : store[idx].definition_en,
      example_en: example_en !== undefined ? example_en.trim() : store[idx].example_en,
      example_vi: example_vi !== undefined ? example_vi.trim() : store[idx].example_vi,
      unit: unit !== undefined ? parseInt(unit, 10) : store[idx].unit,
      unit_title: unit_title !== undefined ? unit_title.trim() : store[idx].unit_title,
      category: category !== undefined ? category.trim() : store[idx].category,
      page_number: page_number !== undefined ? (page_number ? parseInt(page_number, 10) : null) : store[idx].page_number,
      status: status !== undefined ? status : store[idx].status,
      note: note !== undefined ? note.trim() : store[idx].note
    };
    saveMemoryStore(store);

    res.json({ success: true, message: 'Cập nhật từ vựng thành công!', data: store[idx] });
  } catch (error) {
    console.error('Error in updateVocabulary:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật từ vựng: ' + error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pool = await getPool();

    if (pool) {
      await pool.query('UPDATE vocabularies SET status = ? WHERE id = ?', [status, id]);
      return res.json({ success: true, message: 'Cập nhật trạng thái thành công!', status });
    }

    const store = getMemoryStore();
    const item = store.find(s => String(s.id) === String(id));
    if (item) {
      item.status = status;
      saveMemoryStore(store);
    }
    res.json({ success: true, message: 'Cập nhật trạng thái thành công!', status });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi cập nhật trạng thái: ' + error.message });
  }
};

export const deleteVocabulary = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getPool();

    if (pool) {
      await pool.query('DELETE FROM vocabularies WHERE id = ?', [id]);
      return res.json({ success: true, message: 'Đã xóa từ vựng khỏi MySQL!' });
    }

    let store = getMemoryStore();
    store = store.filter(s => String(s.id) !== String(id));
    saveMemoryStore(store);
    res.json({ success: true, message: 'Đã xóa từ vựng thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi xóa từ vựng: ' + error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const pool = await getPool();

    if (pool) {
      const [totalRows] = await pool.query('SELECT COUNT(*) as total FROM vocabularies');
      const [statusRows] = await pool.query('SELECT status, COUNT(*) as count FROM vocabularies GROUP BY status');
      const [unitRows] = await pool.query('SELECT unit, COUNT(*) as count FROM vocabularies GROUP BY unit ORDER BY unit ASC');

      const total = totalRows[0].total;
      const statusMap = { new: 0, learning: 0, mastered: 0 };
      statusRows.forEach(r => { statusMap[r.status] = r.count; });

      return res.json({
        success: true,
        data: {
          total,
          mastered: statusMap.mastered,
          learning: statusMap.learning,
          new: statusMap.new,
          masteredPercent: total > 0 ? Math.round((statusMap.mastered / total) * 100) : 0,
          unitsCount: unitRows.length
        }
      });
    }

    const store = getMemoryStore();
    const total = store.length;
    const mastered = store.filter(s => s.status === 'mastered').length;
    const learning = store.filter(s => s.status === 'learning').length;
    const newCount = store.filter(s => s.status === 'new').length;
    const units = new Set(store.map(s => s.unit)).size;

    res.json({
      success: true,
      data: {
        total,
        mastered,
        learning,
        new: newCount,
        masteredPercent: total > 0 ? Math.round((mastered / total) * 100) : 0,
        unitsCount: units
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi thống kê: ' + error.message });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    const pool = await getPool();

    if (pool) {
      const [units] = await pool.query('SELECT DISTINCT unit, unit_title FROM vocabularies ORDER BY unit ASC');
      const [categories] = await pool.query("SELECT DISTINCT category FROM vocabularies WHERE category IS NOT NULL AND category != '' ORDER BY category ASC");

      return res.json({
        success: true,
        data: {
          units: units.map(u => ({ unit: u.unit, title: u.unit_title || `Unit ${u.unit}` })),
          categories: categories.map(c => c.category)
        }
      });
    }

    const store = getMemoryStore();
    const unitMap = new Map();
    const catSet = new Set();

    store.forEach(s => {
      if (s.unit && !unitMap.has(s.unit)) {
        unitMap.set(s.unit, s.unit_title || `Unit ${s.unit}`);
      }
      if (s.category) catSet.add(s.category);
    });

    const units = Array.from(unitMap.entries()).map(([unit, title]) => ({ unit, title })).sort((a, b) => a.unit - b.unit);
    const categories = Array.from(catSet).sort();

    res.json({
      success: true,
      data: { units, categories }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi lấy bộ lọc: ' + error.message });
  }
};

export const resetDefaultData = async (req, res) => {
  try {
    const pool = await getPool();

    if (pool) {
      await pool.query('TRUNCATE TABLE vocabularies');
      await seedDefaultData();
      const [count] = await pool.query('SELECT COUNT(*) as total FROM vocabularies');
      return res.json({
        success: true,
        message: `Đã khôi phục dữ liệu gốc thành công! Hiện có ${count[0].total} từ vựng trong MySQL.`,
        total: count[0].total
      });
    }

    loadMemoryData();
    res.json({
      success: true,
      message: `Đã khôi phục dữ liệu mặc định thành công! Hiện có ${getMemoryStore().length} từ vựng.`,
      total: getMemoryStore().length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khôi phục: ' + error.message });
  }
};

export const exportJSON = async (req, res) => {
  try {
    const pool = await getPool();
    const data = pool ? (await pool.query('SELECT * FROM vocabularies ORDER BY id ASC'))[0] : getMemoryStore();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="hacknao_vocabularies.json"');
    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi xuất file: ' + error.message });
  }
};

export const importJSON = async (req, res) => {
  try {
    const items = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không đúng định dạng mảng JSON.' });
    }

    const pool = await getPool();
    let insertedCount = 0;

    if (pool) {
      for (const item of items) {
        if (item.word && item.meaning_vi) {
          await pool.query(`
            INSERT INTO vocabularies (
              word_number, word, phonetic, word_type, meaning_vi, sound_bridge,
              definition_en, example_en, example_vi, unit, unit_title, category,
              page_number, image_url, status, note
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            item.word_number || null,
            item.word.trim(),
            item.phonetic || '',
            item.word_type || 'noun',
            item.meaning_vi.trim(),
            item.sound_bridge || '',
            item.definition_en || '',
            item.example_en || '',
            item.example_vi || '',
            item.unit || 1,
            item.unit_title || `Unit ${item.unit || 1}`,
            item.category || 'General',
            item.page_number || null,
            item.image_url || null,
            item.status || 'new',
            item.note || null
          ]);
          insertedCount++;
        }
      }
      return res.json({ success: true, message: `Đã import thành công ${insertedCount} từ vựng vào MySQL!` });
    }

    const store = getMemoryStore();
    items.forEach(item => {
      if (item.word && item.meaning_vi) {
        const newId = store.length > 0 ? Math.max(...store.map(s => s.id)) + 1 : 1;
        store.push({ id: newId, ...item });
        insertedCount++;
      }
    });
    saveMemoryStore(store);

    res.json({ success: true, message: `Đã import thành công ${insertedCount} từ vựng!` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi import: ' + error.message });
  }
};

export const getDatabaseStatus = (req, res) => {
  res.json({
    success: true,
    status: getStatus()
  });
};
