import { Web3Button } from "@thirdweb-dev/react";
import { KEY_PASS_CONTRACT } from "../const/addresses";

export default function PassClaim() {
    return (
        <>
            <h3>Claim University Pass</h3>
            <p>Claim a University Pass for 10 UNIC.</p>
            <Web3Button
                contractAddress={KEY_PASS_CONTRACT}
                action={(contract) => contract.erc1155.claim(0, 1)}
                onSuccess={(alert) => "University Pass Claimed!"}
            >Claim Pass</Web3Button>
        </>
    );
};