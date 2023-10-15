#!/bin/bash

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/infra/grpcClient/proto/ src/infra/grpcClient/proto/*.proto
