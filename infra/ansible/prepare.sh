#!usr/bin/env bash
set -euo pipefail

echo "$ANSIBLE_ANSIBLE_SSH_PRIVATE_KEY" > "$1/ansible"
echo "$PKI_ROOT_CERTIFICATE" > "$1/root.crt"
echo "$PKI_ANSIBLE_CERTIFICATE" > "$1/ansible.crt"
echo "$PKI_ANSIBLE_PRIVATE_KEY" > "$1/ansible.key"
echo "$PKI_CHAIN_CERTIFICATE" > "$1/chain.crt"
