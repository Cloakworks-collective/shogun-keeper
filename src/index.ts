import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";

const KEEPER_PK = '0xa953ef08e9a2bc62a61fb7f96eebb05091b50d966545ba993562dd0ce13d51a8';
const WARLORD_ADDRESS = '0xba50f4b5a6b6d5dce1d181f957a13bb0e344bc71f83f496b461ba4340f749a6e';

declare const _STD_: any;

if (typeof _STD_ === "undefined") {
  // If _STD_ is not defined, we know it's not running in the Acurast Cloud.
  // Define _STD_ here for local testing.
  console.log("Running in local environment");
  (global as any)._STD_ = {
    app_info: { version: "local" },
    job: { getId: () => "local" },
    device: { getAddress: () => "local" },
  };
}

async function call_tick() {
  // Setup the client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  // get the keeper's account
  const privateKey = new Ed25519PrivateKey(KEEPER_PK);
  const keeper  = Account.fromPrivateKey({ privateKey });
  console.log(`Keeper's address is: ${keeper.accountAddress}`);
 
  // build the transaction
  const txn = await aptos.transaction.build.simple({
    sender: keeper.accountAddress,
    data: {
      // All transactions on Aptos are implemented via smart contracts.
      function: `${WARLORD_ADDRESS}::warlords::tick_tock`,
      functionArguments: [],
    },
  });
 
  // Both signs and submits the transaction with the keeper's account
  console.log("signing and submitting transaction ...");
  const committedTxn = await aptos.signAndSubmitTransaction({
    signer: keeper,
    transaction: txn,
  });

  // Waits for Aptos to verify and execute the transaction
  console.log("waiting for transaction to be executed ...");
  const executedTransaction = await aptos.waitForTransaction({
    transactionHash: committedTxn.hash,
  });

  console.log("Transaction hash:", executedTransaction.hash);
}

async function call_castle_info() {
  // Setup the client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  try {
    // Call the view function
    const response = await aptos.view({
      payload: {
      function: `${WARLORD_ADDRESS}::warlords::get_castle_info`
      }
    })
    // Parse and display the result
    if (response && response.length >= 3) {
      const [kingAddress, defenseArmy, weatherValue] = response;
      console.log("Castle Information:");
      console.log("King Address:", kingAddress);
      console.log("Defense Army:", defenseArmy);
      console.log("Weather Value:", weatherValue);
    } else {
      console.log("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error fetching castle info:", error);
  }
}

call_tick();
//call_castle_info();



