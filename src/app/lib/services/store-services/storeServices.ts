import {
  collection, doc, getDocs, query, where, orderBy, limit,
  updateDoc, addDoc, getDoc, Timestamp, writeBatch, increment,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import {
  Store, StoreCategory, Product, Order,
  OrderStatus, PaymentStatus, ProductStatus, ProductCategory
} from '@/app/collections/schema';
import { db } from '@/app/config/firebase';

export class StoreService {
  static async createStore(storeData: Partial<Store>): Promise<string> {
    const storeRef = doc(collection(db, 'stores'));

    await setDoc(storeRef, {
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

  // Get store
  static async getStores(ownerId?: string): Promise<Store[]> {
    try {
      const storesRef = collection(db, 'stores');

      const q = ownerId
        ? query(storesRef, where('ownerId', '==', ownerId), orderBy('createdAt', 'desc'))
        : query(storesRef, orderBy('createdAt', 'desc'));

      const snapshot = await getDocs(q);

      const stores: Store[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Store[];

      return stores;
    } catch (error) {
      console.error('Error fetching stores:', error);
      return [];
    }
  }

  // Get stores by owner
  static async getStoresByOwner(ownerId: any): Promise<Store[]> {
    try {
      const storesRef = collection(db, "stores");
      const q = query(storesRef, where("ownerId", "==", ownerId));

      const snapshot = await getDocs(q);
      const stores: Store[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Store[];

      return stores;
    } catch (error) {
      console.error("Error fetching stores by owner:", error);
      return [];
    }
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

  // Create product ________Product Services
  static async createProduct(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'metrics'>
  ): Promise<string> {
    try {
      const productRef = await addDoc(collection(db, 'products'), {
        ...productData,
        metrics: {
          viewCount: 0,
          purchaseCount: 0,
          averageRating: 0,
          reviewCount: 0,
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return productRef.id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error(`Failed to create product: ${error}`);
    }
  }

  static async getProductById(id: string | any) {
    try {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        throw new Error("Product not found");
      }

      return {
        id: snap.id,
        ...snap.data(),
      };
    } catch (error: any) {
      console.error("getProductById failed:", error);
      throw new Error(`Error occurred while fetching product: ${error.message}`);
    }
  }

  static async getProductsByPrice(sortOrder: 'lowest' | 'highest') {
    const useQuery = query(
      collection(db, 'products'),
      orderBy('price', sortOrder === 'lowest' ? 'asc' : 'desc')
    );

    const productsSnapshot = await getDocs(useQuery);
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  }

  // In your StoreService, add this method:
  static async getProductsByDate(sortOrder: 'newest' | 'oldest') {
    const useQuery = query(
      collection(db, 'products'),
      orderBy('createdAt', sortOrder === 'newest' ? 'desc' : 'asc')
    );

    const productsSnapshot = await getDocs(useQuery);
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  }
  // Get product by ID
  static async getUserProducts(userId: any): Promise<Product[]> {
    const userProductsQuery = query(
      collection(db, 'products'),
      where('storeId', '==', userId)
    );

    const productsSnapshot = await getDocs(userProductsQuery);
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  }

  // Get products by store
  static async getProductsByStore(storeId: string, status?: ProductStatus): Promise<Product[]> {
    let q;
    const productsRef = collection(db, 'products');

    if (status) {
      q = query(
        productsRef,
        where('storeId', '==', storeId),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'products'),
        where('storeId', '==', storeId),
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



  // ---------------- UPDATE PRODUCT STATUS (ENABLE / DISABLE) ----------------
  static async updateProductStatus(
    productId: string,
    status: ProductStatus
  ): Promise<void> {
    try {
      await updateDoc(doc(db, 'products', productId), {
        status,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating product status:', error);
      throw new Error(`Failed to update product status: ${error}`);
    }
  }

  // ---------------- SOFT DELETE PRODUCT (RECOMMENDED) ----------------
  static async softDeleteProduct(productId: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'products', productId), {
        status: 'deleted',
        deletedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error soft deleting product:', error);
      throw new Error(`Failed to delete product: ${error}`);
    }
  }

  // ---------------- HARD DELETE (ADMIN / DANGEROUS) ----------------
  // Only use this for admin cleanup — NOT normal sellers
  static async permanentlyDeleteProduct(productId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (error) {
      console.error('Error permanently deleting product:', error);
      throw new Error(`Failed to permanently delete product: ${error}`);
    }
  }

  // ---------------- OPTIONAL: BULK STATUS UPDATE (FUTURE READY) ----------------
  static async bulkUpdateProductStatus(
    productIds: string[],
    status: ProductStatus
  ): Promise<void> {
    try {
      const updates = productIds.map((id) =>
        updateDoc(doc(db, 'products', id), {
          status,
          updatedAt: Timestamp.now(),
        })
      );

      await Promise.all(updates);
    } catch (error) {
      console.error('Error bulk updating products:', error);
      throw new Error(`Failed to bulk update products: ${error}`);
    }
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