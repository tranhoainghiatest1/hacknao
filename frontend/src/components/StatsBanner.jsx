import React from 'react';
import { Bookmark, CheckCircle2, Hourglass, Sparkles } from 'lucide-react';

export function StatsBanner({ stats, onFilterStatus }) {
  const { total = 0, mastered = 0, learning = 0, new: newCount = 0, masteredPercent = 0, unitsCount = 0 } = stats || {};

  return (
    <section className="stats-banner">
      <div className="stat-card" onClick={() => onFilterStatus('all')} title="Xem tất cả từ vựng">
        <div className="stat-icon icon-total">
          <Bookmark size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Tổng số từ vựng</span>
          <h3 className="stat-value">{total}</h3>
          <span className="stat-sub">{unitsCount} Units</span>
        </div>
      </div>

      <div className="stat-card" onClick={() => onFilterStatus('mastered')} title="Xem từ đã thuộc">
        <div className="stat-icon icon-mastered">
          <CheckCircle2 size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Đã thuộc làu</span>
          <h3 className="stat-value">{mastered}</h3>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${masteredPercent}%` }} />
          </div>
          <span className="stat-sub"><strong>{masteredPercent}%</strong> hoàn thành</span>
        </div>
      </div>

      <div className="stat-card" onClick={() => onFilterStatus('learning')} title="Xem từ đang học">
        <div className="stat-icon icon-learning">
          <Hourglass size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Đang luyện tập</span>
          <h3 className="stat-value">{learning}</h3>
          <span className="stat-sub">Cần ôn lại</span>
        </div>
      </div>

      <div className="stat-card" onClick={() => onFilterStatus('new')} title="Xem từ mới">
        <div className="stat-icon icon-new">
          <Sparkles size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Từ mới chưa học</span>
          <h3 className="stat-value">{newCount}</h3>
          <span className="stat-sub">Sẵn sàng học</span>
        </div>
      </div>
    </section>
  );
}
