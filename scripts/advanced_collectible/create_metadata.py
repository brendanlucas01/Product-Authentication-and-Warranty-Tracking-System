#!/usr/bin/python3
import os
import requests
import json
from brownie import AdvancedCollectible, network
from metadata import sample_metadata
from scripts.helpful_scripts import get_breed
from pathlib import Path
from dotenv import load_dotenv
import ast
from pinatapy import PinataPy
pinata = PinataPy(os.getenv("PINATA_API_KEY"), os.getenv("PINATA_API_SECRET"))



load_dotenv()

# breed_to_image_uri = {
#     "PUG": "https://ipfs.io/ipfs/QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8?filename=pug.png",
#     "SHIBA_INU": "https://ipfs.io/ipfs/QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU?filename=shiba-inu.png",
#     "ST_BERNARD": "https://ipfs.io/ipfs/QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW?filename=st-bernard.png",
# }


def main():
    print("Working on " + network.show_active())
    
    #check if file is present
    
    advanced_collectible = AdvancedCollectible[-1]
    # advanced_collectible = AdvancedCollectible[-4]
    # advanced_collectible = AdvancedCollectible
    number_of_advanced_collectibles = advanced_collectible.tokenCounter()
    print(
        "The number of tokens you've deployed is: "
        + str(number_of_advanced_collectibles)
    )
    write_metadata(number_of_advanced_collectibles, advanced_collectible)


def write_metadata(token_ids, nft_contract):
    file_path = os.getcwd()+r"/transfer_files/test1.txt"
    print(file_path, os.getcwd(), os.path.isfile(file_path))
    #open text file in read mode
    text_file = open(file_path, "r")
    #read whole file to a string
    datas = text_file.read()
    #close file
    text_file.close()
    input_dict = ast.literal_eval(datas)
    print(datas,type(input_dict))
    for token_id in range(token_ids-1,token_ids):
    # for token_id in range(token_ids):
        collectible_metadata = sample_metadata.metadata_template
        # breed = get_breed(nft_contract.tokenIdToBreed(token_id))
        # image_name = input("\n\nEnter Image Name:")
        image_name = input_dict["image"]
        metadata_file_name = (
            "./metadata/{}/".format(network.show_active())
            + str(token_id)
            + "-"
            + image_name
            + ".json"
        )
        if Path(metadata_file_name).exists():
            print(
                "{} already found, delete it to overwrite!".format(
                    metadata_file_name)
            )
        else:
            print("Creating Metadata file: " + metadata_file_name)
            # collectible_metadata["name"] = input("\n\nEnter Name of Object: ")
            # collectible_metadata["description"] = input("\n\nEnter Description of Object: ")
            # collectible_metadata["attributes"][0]["value"] = int(input("\n\nEnter Purity of gold: "))
            # collectible_metadata["attributes"][1]["value"] = int(input("\n\nEnter Weight of Biscuit: "))
            # collectible_metadata["attributes"][2]["value"] = int(input("\n\nEnter Worth of Biscuit: "))
            # collectible_metadata["attributes"][3]["value"] = input("\n\nEnter Predecessor Address: ")

            collectible_metadata["name"] = input_dict["name"]
            collectible_metadata["description"] = input_dict["desc"]
            collectible_metadata["attributes"][0]["trait_type"] = input_dict["trait1Name"]
            collectible_metadata["attributes"][1]["trait_type"] = input_dict["trait2Name"]
            collectible_metadata["attributes"][2]["trait_type"] = input_dict["trait3Name"]
            collectible_metadata["attributes"][3]["trait_type"] = input_dict["trait4Name"]
            collectible_metadata["attributes"][4]["trait_type"] = "Creator Name"
            collectible_metadata["attributes"][0]["value"] = input_dict["trait1Value"]
            collectible_metadata["attributes"][1]["value"] = input_dict["trait2Value"]
            collectible_metadata["attributes"][2]["value"] = input_dict["trait3Value"]
            collectible_metadata["attributes"][3]["value"] = input_dict["trait4Value"]
            collectible_metadata["attributes"][4]["value"] = input_dict["creatorName"]


            image_to_upload = None
            if os.getenv("UPLOAD_IPFS") == "true":
                image_path = "./img/{}".format(image_name)
                image_to_upload = upload_to_ipfs(image_path)
            image_to_upload = (
                breed_to_image_uri[image_name] if not image_to_upload else image_to_upload
            )
            collectible_metadata["image"] = image_to_upload

            with open(metadata_file_name, "w") as file:
                json.dump(collectible_metadata, file)
            if os.getenv("UPLOAD_IPFS") == "true":
                upload_to_ipfs(metadata_file_name)
        

# curl -X POST -F file=@metadata/rinkeby/0-SHIBA_INU.json http://localhost:5001/api/v0/add


def upload_to_ipfs(filepath):
    with Path(filepath).open("rb") as fp:
        image_binary = fp.read()
        ipfs_url = (
            os.getenv("IPFS_URL")
            if os.getenv("IPFS_URL")
            else "http://localhost:5001"
        )
        response = requests.post(ipfs_url + "/api/v0/add",files={"file": image_binary})
        ipfs_hash = response.json()["Hash"]
        filename = filepath.split("/")[-1:][0]
        pinata.pin_hash_to_ipfs(ipfs_hash, filename)
        image_uri = "ipfs://{}?filename={}".format(
            ipfs_hash, filename)
        
        print(image_uri)
    return image_uri
