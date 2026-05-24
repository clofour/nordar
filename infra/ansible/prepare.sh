#!/usr/bin/env bash
set -euo pipefail

mkdir -p "$1"

echo "$ANSIBLE_SSH_PRIVATE_KEY" > "$1/ansible"

echo "$PKI_ROOT_CERTIFICATE" > "$1/root.crt"
echo "$PKI_ANSIBLE_CERTIFICATE" > "$1/ansible.crt"
echo "$PKI_ANSIBLE_PRIVATE_KEY" > "$1/ansible.key"
echo "$PKI_CHAIN_CERTIFICATE" > "$1/chain.crt"


chmod 0700 "$1"
chmod 0600 "$1/ansible" "$1/root.crt" "$1/ansible.crt" "$1/ansible.key" "$1/chain.crt"
