import database from '../src/models';

class OfferService {
  static async getAllOffers() {
    try {
      return await database.Offer.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addOffer(newOffer) {
    try {
      return await database.Offer.create(newOffer);
    } catch (error) {
      throw error;
    }
  }

  static async updateOffer(id, updateOffer) {
    try {
      const offerToUpdate = await database.Offer.findOne({
        where: { id: Number(id) }
      });

      if (offerToUpdate) {
        await database.Offer.update(updateOffer, { where: { id: Number(id) } });

        return updateOffer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAOffer(id) {
    try {
      const theOffer = await database.Offer.findOne({
        where: { id: Number(id) }
      });

      return theOffer;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOffer(id) {
    try {
      const offerToDelete = await database.Offer.findOne({ where: { id: Number(id) } });

      if (offerToDelete) {
        const deletedOffer = await database.Offer.destroy({
          where: { id: Number(id) }
        });
        return deletedOffer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default OfferService;
