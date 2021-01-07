import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady, randomAsHex } from '@polkadot/util-crypto';

async function main () {
  await cryptoWaitReady();

  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
  const seed = randomAsHex(32);
  const pair = keyring.addFromUri(seed, { name: 'testing' });

  return {
    address: pair.address,
    seed
  };
}

main()
  .then((result) => {
    console.log(result);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
