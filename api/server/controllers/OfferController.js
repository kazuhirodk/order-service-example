import OfferService from '../services/OfferService';
import Util from '../utils/Utils';

const util = new Util();

class OfferController {
  static async getAllOffers(req, res) {
    try {
      const allOffers = await OfferService.getAllOffers();
      if (allOffers.length > 0) {
        util.setSuccess(200, 'Offers retrieved', allOffers);
      } else {
        util.setSuccess(200, 'No offer found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addOffer(req, res) {
    if (!req.body.course || !req.body.price || !req.body.availableSeats) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newOffer = req.body;
    try {
      const createdOffer = await OfferService.addOffer(newOffer);
      util.setSuccess(201, 'Offer Added!', createdOffer);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedOffer(req, res) {
    const alteredOffer = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateOffer = await OfferService.updateOffer(id, alteredOffer);
      if (!updateOffer) {
        util.setError(404, `Cannot find offer with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Offer updated', updateOffer);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAOffer(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theOffer = await OfferService.getAOffer(id);

      if (!theOffer) {
        util.setError(404, `Cannot find offer with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Offer', theOffer);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteOffer(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const offerToDelete = await OfferService.deleteOffer(id);

      if (offerToDelete) {
        util.setSuccess(200, 'Offer deleted');
      } else {
        util.setError(404, `Offer with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default OfferController;
