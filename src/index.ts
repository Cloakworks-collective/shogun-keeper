import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";

const WEBHOOK_URL = 'https://webhook.site/c86183b2-ae9b-47e6-b48c-3f5c975825fc';

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

async function delay() {
  console.log("Start");
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("Waited for 5 seconds");
  console.log("End");
}

async function example() {
 
  // Setup the client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);
  

  // ===============  get the castle info =====================================
  //  try {
  //    // Call the view function
  //    const response = await aptos.view({
  //       payload: {
  //       function: "0xba50f4b5a6b6d5dce1d181f957a13bb0e344bc71f83f496b461ba4340f749a6e::warlords::get_castle_info"
  //       }
  //     })
  //    // Parse and display the result
  //    if (response && response.length >= 3) {
  //      const [kingAddress, defenseArmy, weatherValue] = response;
  //      console.log("Castle Information:");
  //      console.log("King Address:", kingAddress);
  //      console.log("Defense Army:", defenseArmy);
  //      console.log("Weather Value:", weatherValue);
  //    } else {
  //      console.log("Unexpected response format:", response);
  //    }
  //  } catch (error) {
  //    console.error("Error fetching castle info:", error);
  //  }

  // ===============  call tick =====================================

  // const privateKey = new Ed25519PrivateKey("0xa953ef08e9a2bc62a61fb7f96eebb05091b50d966545ba993562dd0ce13d51a8");
  // const keeper  = Account.fromPrivateKey({ privateKey });

  // console.log(`Keeper's address is: ${keeper.accountAddress}`);
 
  // console.log("building transaction ...");
  // // Send a transaction from keeper's account to call game's tick function
  // const txn = await aptos.transaction.build.simple({
  //   sender: keeper.accountAddress,
  //   data: {
  //     // All transactions on Aptos are implemented via smart contracts.
  //     function: "0xba50f4b5a6b6d5dce1d181f957a13bb0e344bc71f83f496b461ba4340f749a6e::warlords::tick_tock",
  //     functionArguments: [],
  //   },
  // });
 
  // // Both signs and submits
  // console.log("signing and submitting transaction ...");
  // const committedTxn = await aptos.signAndSubmitTransaction({
  //   signer: keeper,
  //   transaction: txn,
  // });

  // // Waits for Aptos to verify and execute the transaction
  // console.log("waiting for transaction to be executed ...");
  // const executedTransaction = await aptos.waitForTransaction({
  //   transactionHash: committedTxn.hash,
  // });

  // console.log("Transaction hash:", executedTransaction.hash);

  // ===============  call weather change =====================================
  const privateKey = new Ed25519PrivateKey("0xa953ef08e9a2bc62a61fb7f96eebb05091b50d966545ba993562dd0ce13d51a8");
  const weatherman  = Account.fromPrivateKey({ privateKey });

  console.log(`weatherman's address is: ${weatherman.accountAddress}`);
 
  console.log("building transaction ...");
  // Send a transaction from keeper's account to call game's tick function
  const txn = await aptos.transaction.build.simple({
    sender: weatherman.accountAddress,
    data: {
      // All transactions on Aptos are implemented via smart contracts.
      function: "0xba50f4b5a6b6d5dce1d181f957a13bb0e344bc71f83f496b461ba4340f749a6e::warlords::set_weather",
      functionArguments: ["2"],
    },
  });
 
  // Both signs and submits
  console.log("signing and submitting transaction ...");
  const committedTxn = await aptos.signAndSubmitTransaction({
    signer: weatherman,
    transaction: txn,
  });

  // Waits for Aptos to verify and execute the transaction
  console.log("waiting for transaction to be executed ...");
  const executedTransaction = await aptos.waitForTransaction({
    transactionHash: committedTxn.hash,
  });

  console.log("Transaction hash:", executedTransaction.hash);

}

example();


