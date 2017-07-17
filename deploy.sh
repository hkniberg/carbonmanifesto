#!/usr/bin/env bash
rm -rf ../output/carbon*.tar.gz
meteor build ../output --architecture os.linux.x86_64
cd ../output
mv carbonmanifesto.tar.gz carbonvow.tar.gz
echo "in nodechef, type deploy -i carbonvow"
nodechef