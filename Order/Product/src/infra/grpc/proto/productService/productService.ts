// Original file: src/infra/grpc/proto/productService.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetProductsRequest as _productService_GetProductsRequest, GetProductsRequest__Output as _productService_GetProductsRequest__Output } from '../productService/GetProductsRequest';
import type { GetProductsResponse as _productService_GetProductsResponse, GetProductsResponse__Output as _productService_GetProductsResponse__Output } from '../productService/GetProductsResponse';

export interface productServiceClient extends grpc.Client {
  GetProducts(argument: _productService_GetProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  GetProducts(argument: _productService_GetProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  GetProducts(argument: _productService_GetProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  GetProducts(argument: _productService_GetProductsRequest, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productService_GetProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productService_GetProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productService_GetProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  getProducts(argument: _productService_GetProductsRequest, callback: grpc.requestCallback<_productService_GetProductsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface productServiceHandlers extends grpc.UntypedServiceImplementation {
  GetProducts: grpc.handleUnaryCall<_productService_GetProductsRequest__Output, _productService_GetProductsResponse>;
  
}

export interface productServiceDefinition extends grpc.ServiceDefinition {
  GetProducts: MethodDefinition<_productService_GetProductsRequest, _productService_GetProductsResponse, _productService_GetProductsRequest__Output, _productService_GetProductsResponse__Output>
}
