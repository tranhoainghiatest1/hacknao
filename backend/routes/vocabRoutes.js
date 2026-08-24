import express from 'express';
import * as vocabController from '../controllers/vocabController.js';

const router = express.Router();

// Status & Options
router.get('/status', vocabController.getDatabaseStatus);
router.get('/stats', vocabController.getStats);
router.get('/filters', vocabController.getFilterOptions);

// Import / Export / Reset
router.get('/export', vocabController.exportJSON);
router.post('/import', vocabController.importJSON);
router.post('/reset-default', vocabController.resetDefaultData);

// CRUD
router.get('/', vocabController.getVocabularies);
router.get('/:id', vocabController.getVocabularyById);
router.post('/', vocabController.createVocabulary);
router.put('/:id', vocabController.updateVocabulary);
router.patch('/:id/status', vocabController.updateStatus);
router.delete('/:id', vocabController.deleteVocabulary);

export default router;
