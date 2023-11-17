import Table from "react-bootstrap/Table";
import { HiArrowSmallDown } from "react-icons/hi2";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TableRowAdmin } from "./TableRowAdmin";
import {DotLoader} from "react-spinners"

function TableComponent() {  
    const address = useAddress();
    const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
    const { data: items, isLoading : landRegistrationReqLoader } = useContractRead(
        contract,
        "getLandRegistrationRequestCount"
    );

    return (
        <div>
            {parseFloat(items)>0 ? <Table bordered responsive>
                <thead>
                    <tr>
                        <td className="ps-3">
                            ID <HiArrowSmallDown />
                        </td>
                        <td>Request by </td>
                        <td>Land Location </td>
                        <td>
                            Request At <HiArrowSmallDown />
                        </td>
                        <td>Status </td>
                        <td>Action</td>
                        <td>View</td>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: items }, (_, i) => i + 1).map((item) => (
                        <TableRowAdmin key={item} item={item} />
                    ))}
                </tbody>
            </Table>: <DotLoader color="#36d7b7" size={100} className="homeLoader"/>}
        </div>
    );
}

export default TableComponent;
