#!/usr/bin/python3
from brownie import AdvancedCollectible, accounts, config
from scripts.helpful_scripts import get_breed, fund_with_link, listen_for_event
import time

STATIC_SEED=123

def main():
    dev = accounts.add(config["wallets"]["from_key"])
    print(dev)
    advanced_collectible = AdvancedCollectible[len(AdvancedCollectible) - 1]
    # advanced_collectible = AdvancedCollectible[len(AdvancedCollectible) - 4]

    print(len(AdvancedCollectible))
    print(advanced_collectible)
    fund_with_link(advanced_collectible.address)
    print("310")
    transaction = advanced_collectible.createCollectible("None",{"from": dev})
    print("Waiting on second transaction...")
    # wait for the 2nd transaction
    transaction.wait(1)
    # time.sleep(35)
    print("Still Waiting")
    listen_for_event(
        advanced_collectible, "ReturnedCollectible", timeout=600, poll_interval=10
    )
    print("got the event")
    requestId = transaction.events["RequestedCollectible"]["requestId"]
    token_id = advanced_collectible.requestIdToTokenId(requestId)
    # breed = get_breed(advanced_collectible.tokenIdToBreed(token_id))
    print("NFT of tokenId {}".format(token_id))



