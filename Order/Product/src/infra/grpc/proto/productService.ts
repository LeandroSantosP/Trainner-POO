import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { productServiceClient as _productService_productServiceClient, productServiceDefinition as _productService_productServiceDefinition } from './productService/productService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  productService: {
    GetProductsRequest: MessageTypeDefinition
    GetProductsResponse: MessageTypeDefinition
    Product: MessageTypeDefinition
    productService: SubtypeConstructor<typeof grpc.Client, _productService_productServiceClient> & { service: _productService_productServiceDefinition }
  }
}

