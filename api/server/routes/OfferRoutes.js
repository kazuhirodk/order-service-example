import { Router } from 'express';
import OfferController from '../controllers/OfferController';

const router = Router();

router.get('/', OfferController.getAllOffers);
router.post('/', OfferController.addOffer);
router.get('/:id', OfferController.getAOffer);
router.put('/:id', OfferController.updatedOffer);
router.delete('/:id', OfferController.deleteOffer);

export default router;
