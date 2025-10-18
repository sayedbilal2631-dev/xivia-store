// import { FirestoreService } from "@/app/lib/services/firestoreservices/fireStore";

// export class AdminUtils {
//   // Bulk update product prices
//   static async updateProductPrices(storeId: string, percentageIncrease: number) {
//     const products = await FirestoreService.getProductsByStore(storeId);
    
//     // for (const product of products) {
//     //   const newPrice = product.price * (1 + percentageIncrease / 100);
//     //   await FirestoreService.updateProductStock(product.id, { price: Number(newPrice.toFixed(2)) });
//     // }
    
//     console.log(`Updated prices for ${products.length} products`);
//   }

// //   Get store analytics
//   static async getStoreAnalytics(storeId: string) {
//     const [products, orders] = await Promise.all([
//       FirestoreService.getProductsByStore(storeId),
//       FirestoreService.getOrdersByStore(storeId)
//     ]);

//     const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
//     const pendingOrders = orders.filter(order => order.status === 'pending').length;

//     return {
//       totalProducts: products.length,
//       totalOrders: orders.length,
//       totalRevenue,
//       pendingOrders,
//       lowStockProducts: products.filter(p => p.stock < 10).length
//     };
//   }

//   // Deactivate out-of-stock products
//   static async deactivateOutOfStockProducts(storeId: string) {
//     const products = await FirestoreService.getProductsByStore(storeId);
//     const outOfStock = products.filter(p => p.stock === 0);

//     for (const product of outOfStock) {
//     //   await FirestoreService.updateProduct(product.id, { isActive: false });
//     }

//     console.log(`Deactivated ${outOfStock.length} out-of-stock products`);
//   }
// }