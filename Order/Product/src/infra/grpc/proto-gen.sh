#!/bin/bash

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/infra/grpc/proto/ src/infra/grpc/proto/*.proto
