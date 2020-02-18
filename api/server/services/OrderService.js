import database from '../src/models';
import RabbitMQService from '../../../services/RabbitMQService';
require('dotenv').config('/.env');

const amqp = require('amqplib');
const messageQueueConnectionString = process.env.CLOUDAMQP_URL;
const rabbitMQ = new RabbitMQService();

class OrderService {
  static async getAllOrders() {
    try {
      return await database.Order.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addOrder(newOrder) {
    // connect to Rabbit MQ and create a channel
    let connection = await amqp.connect(messageQueueConnectionString);
    let channel = await connection.createConfirmChannel();

    try {
      await rabbitMQ.publishToChannel(channel, { routingKey: "userRequest", exchangeName: "processing", data: newOrder });
      await rabbitMQ.publishToChannel(channel, { routingKey: "offerRequest", exchangeName: "processing", data: newOrder });
      return await database.Order.create(newOrder);
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(id, updateOrder) {
    try {
      const orderToUpdate = await database.Order.findOne({
        where: { id: Number(id) }
      });

      if (orderToUpdate) {
        await database.Order.update(updateOrder, { where: { id: Number(id) } });

        return updateOrder;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAOrder(id) {
    try {
      const theOrder = await database.Order.findOne({
        where: { id: Number(id) }
      });

      return theOrder;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(id) {
    try {
      const orderToDelete = await database.Order.findOne({ where: { id: Number(id) } });

      if (orderToDelete) {
        const deletedOrder = await database.Order.destroy({
          where: { id: Number(id) }
        });
        return deletedOrder;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService;
