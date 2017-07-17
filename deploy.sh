#!/usr/bin/env bash
rm -rf ../output/carbonmanifesto.tar.gz
meteor build ../output --architecture os.linux.x86_64
cd ../output
echo "in nodechef, type deploy -i carbonmanifesto"
nodechef