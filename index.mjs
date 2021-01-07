import { Keyring } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import { cryptoWaitReady, randomAsHex, mnemonicGenerate, mnemonicToMiniSecret } from '@polkadot/util-crypto';

async function main () {
  await cryptoWaitReady();

  const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });

  console.log('      via seed', keyring.addFromUri(randomAsHex(32), { name: 'testing' }).address);
  console.log('  via mnemonic', keyring.addFromUri(mnemonicGenerate(), { name: 'testing' }).address);

  const miniSecret = u8aToHex(mnemonicToMiniSecret(mnemonicGenerate()));

  console.log('via minisecret', keyring.addFromUri(miniSecret, { name: 'testing' }).address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
