import { 
  collection, doc, getDocs, query, where, orderBy, limit, 
  updateDoc, addDoc, getDoc, Timestamp, writeBatch, increment 
} from 'firebase/firestore';
import { 
  Store, StoreCategory,  Product, Order, 
  OrderStatus, PaymentStatus, ProductStatus, ProductCategory 
} from '@/app/collections/schema';
import { db } from '@/app/config/firebase';
// import { CreateStoreData } from '@/app/collections/store';

export class StoreService {
  // Create new store
 static async createStore(storeData: Partial<Store>): Promise<string> {
  const storeRef = await addDoc(collection(db, 'stores'), {
    ...storeData,
    isVerified: false,
    metrics: {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      averageRating: 0,
      reviewCount: 0,
    },
    products: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return storeRef.id;
}


  // Get store by ID
  static async getStore(storeId: string): Promise<Store | null> {
    const storeDoc = await getDoc(doc(db, 'stores', storeId));
    return storeDoc.exists() ? { id: storeDoc.id, ...storeDoc.data() } as Store : null;
  }
  
  // Get stores by owner
  static async getStoresByOwner(ownerId: string): Promise<Store[]> {
    const q = query(
      collection(db, 'stores'),
      where('ownerId', '==', ownerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Store));
  }
  
  // Get stores by category
  static async getStoresByCategory(category: StoreCategory, limitCount: number = 20): Promise<Store[]> {
    const q = query(
      collection(db, 'stores'),
      where('category', '==', category),
      where('isActive', '==', true),
      orderBy('metrics.totalRevenue', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Store));
  }
  
  // Search stores
  static async searchStores(searchTerm: string): Promise<Store[]> {
    const storesRef = collection(db, 'stores');
    const snapshot = await getDocs(storesRef);
    
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Store))
      .filter(store => 
        store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
  
  // Update store metrics
  // static async updateStoreMetrics(storeId: string, updates: Partial<Store['metrics']>): Promise<void> {
  //   await updateDoc(doc(db, 'stores', storeId), {
  //     metrics: updates,
  //     updatedAt: Timestamp.now()
  //   });
  // }
  
  // Toggle store status
  static async toggleStoreStatus(storeId: string, isActive: boolean): Promise<void> {
    await updateDoc(doc(db, 'stores', storeId), {
      isActive,
      updatedAt: Timestamp.now()
    });
  }
  
  // Get featured stores
  static async getFeaturedStores(limitCount: number = 10): Promise<Store[]> {
    const q = query(
      collection(db, 'stores'),
      where('isActive', '==', true),
      where('isVerified', '==', true),
      orderBy('metrics.totalRevenue', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Store));
  }

  // PRODUCT METHODS

  // Create product
  static async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'metrics'>): Promise<string> {
    const productRef = await addDoc(collection(db, 'products'), {
      ...productData,
      metrics: {
        viewCount: 0,
        purchaseCount: 0,
        averageRating: 0,
        reviewCount: 0
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    // Update store's product count
    await updateDoc(productData.storeId, {
      'metrics.totalProducts': increment(1)
    });

    return productRef.id;
  }

  // Get product by ID
  static async getProduct(productId: string): Promise<Product | null> {
    const productDoc = await getDoc(doc(db, 'products', productId));
    return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } as Product : null;
  }

  // Get products by store
  static async getProductsByStore(storeId: string, status?: ProductStatus): Promise<Product[]> {
    let q;
    if (status) {
      q = query(
        collection(db, 'products'),
        where('storeId', '==', doc(db, 'stores', storeId)),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'products'),
        where('storeId', '==', doc(db, 'stores', storeId)),
        orderBy('createdAt', 'desc')
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  }

  // Get products by category
  static async getProductsByCategory(category: ProductCategory, limitCount: number = 20): Promise<Product[]> {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category),
      where('status', '==', 'active'),
      orderBy('metrics.purchaseCount', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  }

  // Update product
  static async updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
    await updateDoc(doc(db, 'products', productId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }

  // Update product stock
  static async updateProductStock(productId: string, quantity: number): Promise<void> {
    await updateDoc(doc(db, 'products', productId), {
      stock: increment(quantity),
      updatedAt: Timestamp.now()
    });
  }

  // ORDER METHODS

  // Create order
  static async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    // Update store metrics
    await updateDoc(orderData.storeId, {
      'metrics.totalOrders': increment(1),
      'metrics.totalRevenue': increment(orderData.total)
    });

    // Update product purchase counts and stock
    const batch = writeBatch(db);
    orderData.items.forEach(item => {
      const productRef = doc(db, 'products', item.productId.id);
      batch.update(productRef, {
        'metrics.purchaseCount': increment(item.quantity),
        stock: increment(-item.quantity)
      });
    });
    await batch.commit();

    return orderRef.id;
  }

  // Get order by ID
  static async getOrder(orderId: string): Promise<Order | null> {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    return orderDoc.exists() ? { id: orderDoc.id, ...orderDoc.data() } as Order : null;
  }

  // Get orders by store
  static async getOrdersByStore(storeId: string, status?: OrderStatus): Promise<Order[]> {
    let q;
    if (status) {
      q = query(
        collection(db, 'orders'),
        where('storeId', '==', doc(db, 'stores', storeId)),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'orders'),
        where('storeId', '==', doc(db, 'stores', storeId)),
        orderBy('createdAt', 'desc')
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }

  // Get orders by customer
  static async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    const q = query(
      collection(db, 'orders'),
      where('customerId', '==', doc(db, 'users', customerId)),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }

  // Update order status
  static async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    const updateData: any = {
      status,
      updatedAt: Timestamp.now()
    };

    // Set timestamps based on status
    if (status === 'shipped') {
      updateData.shippedAt = Timestamp.now();
    } else if (status === 'delivered') {
      updateData.deliveredAt = Timestamp.now();
    } else if (status === 'cancelled') {
      updateData.cancelledAt = Timestamp.now();
    } else if (status === 'refunded') {
      updateData.refundedAt = Timestamp.now();
    }

    await updateDoc(doc(db, 'orders', orderId), updateData);
  }

  // Update payment status
  static async updatePaymentStatus(orderId: string, paymentStatus: PaymentStatus): Promise<void> {
    const updateData: any = {
      paymentStatus,
      updatedAt: Timestamp.now()
    };

    if (paymentStatus === 'completed') {
      updateData.paidAt = Timestamp.now();
    }

    await updateDoc(doc(db, 'orders', orderId), updateData);
  }

  // ANALYTICS METHODS

  // Get store analytics
  static async getStoreAnalytics(storeId: string, startDate: Timestamp, endDate: Timestamp) {
    const ordersQuery = query(
      collection(db, 'orders'),
      where('storeId', '==', doc(db, 'stores', storeId)),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate)
    );

    const ordersSnapshot = await getDocs(ordersQuery);
    const orders = ordersSnapshot.docs.map(doc => doc.data() as Order);

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      ordersByStatus: orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<OrderStatus, number>)
    };
  }

  // SEARCH METHODS

  // Search products
  static async searchProducts(searchTerm: string, storeId?: string): Promise<Product[]> {
    let q;
    if (storeId) {
      q = query(
        collection(db, 'products'),
        where('storeId', '==', doc(db, 'stores', storeId)),
        where('status', '==', 'active')
      );
    } else {
      q = query(
        collection(db, 'products'),
        where('status', '==', 'active')
      );
    }

    const snapshot = await getDocs(q);
    
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Product))
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }

  // INVENTORY METHODS

  // Get low stock products
  static async getLowStockProducts(storeId: string, threshold: number = 10): Promise<Product[]> {
    const q = query(
      collection(db, 'products'),
      where('storeId', '==', doc(db, 'stores', storeId)),
      where('stock', '<=', threshold),
      where('status', '==', 'active'),
      orderBy('stock', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  }
}