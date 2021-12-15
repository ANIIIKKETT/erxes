import { IPOS } from './types';

/**
 * pos
 */

export const posSChema = {
  _id: { pkey: true },
  name: { type: String, label: 'Name' },
  description: { type: String, label: 'Description', optional: true },
  userId: { type: String, optional: true, label: 'Created by' },
  createdAt: { type: Date, label: 'Created at' },
  integrationId: { type: String, label: 'Integration id' },
  productDetails: { type: [String], label: 'Product fields' },
  adminIds: { type: [String], label: 'Admin user ids' },
  cashierIds: { type: [String], label: 'Cashier ids' },
  waitingScreen: { type: Object, label: 'Waiting screen config' },
  kioskMachine: { type: Object, label: 'Kiosk config' },
  kitchenScreen: { type: Object, label: 'Kitchen screen config' },
  uiOptions: { type: Object, label: 'UI Options' },
  formSectionTitle: { type: String, label: 'Form section title' },
  formIntegrationIds: { type: [String], label: 'Form integration ids' },
  token: { type: String, label: 'Pos token' },
  ebarimtConfig: { type: Object, label: 'Ebarimt Config' },
  syncInfo: { type: Object, label: 'sync info' }
};

class Pos {
  public static async getPosList(models, query: any) {
    return models.Pos.find(query).sort({ createdAt: 1 });
  }

  public static async getPos(models, query: any) {
    const pos = await models.Pos.findOne(query).lean();

    if (!pos) {
      throw new Error('POS not found');
    }
    return pos;
  }

  public static generateToken(length: number = 32) {
    const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(
      ''
    );
    const b = [];

    for (let i = 0; i < length; i++) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);

      b[i] = a[j];
    }

    return b.join('');
  }

  public static async posAdd(models, user, doc: IPOS) {
    try {
      const integration = await models.Integrations.createIntegration(
        { ...doc, kind: 'pos', isActive: true },
        user._id
      );

      return models.Pos.create({
        ...doc,
        userId: user._id,
        integrationId: integration._id,
        createdAt: new Date(),
        token: this.generateToken()
      });
    } catch (e) {
      throw new Error(
        `Can not create POS integration. Error message: ${e.message}`
      );
    }
  }

  public static async posEdit(models, _id: string, doc: IPOS) {
    const pos = await models.Pos.getPos(models, { _id });

    await models.Pos.updateOne({ _id }, { $set: doc }, { runValidators: true });

    await models.Integrations.updateOne(
      { _id: pos.integrationId },
      { $set: doc },
      { runValidators: true }
    );

    return models.Pos.findOne({ _id }).lean();
  }

  public static async posRemove(models, _id: string) {
    const pos = await models.Pos.getPos(models, { _id });

    await models.Integrations.removeIntegration(pos.integrationId);

    await models.ProductGroups.remove({ posId: pos._id });

    return models.Pos.deleteOne({ _id });
  }
}

/**
 * productGroups
 */

export const productGroupSchema: any = {
  _id: { pkey: true },
  name: { type: String, label: 'Name' },
  description: { type: String, label: 'Description', optional: true },
  posId: { type: String, label: 'Pos id' },
  categoryIds: { type: [String], optional: true, label: 'Category ids' },
  excludedCategoryIds: {
    type: [String],
    optional: true,
    label: 'Exclude Category ids'
  },
  excludedProductIds: {
    type: [String],
    optional: true,
    label: 'Exclude Product ids'
  }
};

class ProductGroup {
  public static async groups(models, posId: string) {
    return models.ProductGroups.find({ posId }).lean();
  }

  public static async groupsAdd(models, user, name, description) {
    return models.ProductGroups.create({
      userId: user._id,
      name,
      description,
      createdAt: new Date()
    });
  }

  public static async groupsEdit(models, _id, doc) {
    const group = await models.ProductGroups.findOne({ _id }).lean();

    if (!group) {
      throw new Error('group not found');
    }

    await models.ProductGroups.updateOne(
      { _id },
      {
        $set: doc
      }
    );

    return await models.ProductGroups.findOne({ _id }).lean();
  }

  public static async groupsRemove(models, _id: string) {
    return models.ProductGroups.deleteOne({ _id });
  }
}

const posOrderItemSchema = {
  _id: { type: String },
  createdAt: { type: Date },
  productId: { type: String, label: 'Product' },
  count: { type: Number },
  unitPrice: { type: Number },
  discountAmount: { type: Number },
  discountPercent: { type: Number },
};

const posOrdersSchema = {
  _id: { pkey: true },
  createdAt: { type: Date },
  status: { type: String, label: 'Status of the order' },
  paidDate: { type: Date, label: 'Paid date' },
  number: { type: String, label: 'Order number', unique: true },
  customerId: { type: String, label: 'Customer' },
  cardAmount: { type: Number },
  cashAmount: { type: Number },
  mobileAmount: { type: Number },
  totalAmount: { type: Number },
  finalAmount: { type: Number },
  shouldPrintEbarimt: { type: Boolean, label: 'Should print ebarimt for this order' },
  printedEbarimt: { type: Boolean, label: 'Printed ebarimt', default: false },
  billType: { type: String, label: 'Ebarimt receiver entity type' },
  billId: { type: String, label: 'Bill id' },
  registerNumber: { type: String, label: 'Register number of the entity' },
  oldBillId: { type: String, label: 'Previous bill id if it is changed' },
  type: { type: String, },
  userId: { type: String, label: 'Created user id' },

  items: { type: posOrderItemSchema, label: 'items' },
  posToken: { type: String, optional: true },
  syncId: { type: String, optional: true }
};


export default [
  {
    name: 'Pos',
    schema: posSChema,
    klass: Pos
  },
  {
    name: 'ProductGroups',
    schema: productGroupSchema,
    klass: ProductGroup
  },
  {
    name: 'PosOrders',
    schema: posOrdersSchema,
  }
];
