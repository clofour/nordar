#!usr/bin/env bash
set -euo pipefail

cat "$PKI_ROOT_CERTIFICATE" > "$1/root.crt"
cat "$PKI_ANSIBLE_CERTIFICATE" > "$1/ansible.crt"
cat "$PKI_ANSIBLE_PRIVATE_KEY" > "$1/ansible.key"
cat "$PKI_CHAIN_CERTIFICATE" > "$1/chain.crt"
