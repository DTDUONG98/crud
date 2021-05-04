import { useEffect, useState } from "react";
// import { Loading } from "../../../components/loading/loading";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableStaffs from "./row-table-staffs";
const queryString = require("query-string");
export const TableStaffs = () => {
    //   const [loading, setLoading] = useState(false);
    const [ListStaffs, setListStaffs] = useState([]);
    const [page, setPage] = useState(1);
    const getDataProjectStatus = async () => {
        console.log('get data')
    };
    useEffect(() => {
        getDataProjectStatus();
    }, [page]);
    const handelChangePage = e => {
        const numberPage = e;
        setPage(numberPage);
    };
    return (
        <div className="h-96 sm:w-full">
            <div className="sm:w-full sm:flex sm:flex-col sm:items-center">
                <table className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12">No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                            <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Birthday</th>
                            <th className="pt-5 pb-5 w-1/12 sm:w-2/12">SĐT</th>
                            <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Tech Stack</th>
                            <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Project join</th>
                        </tr>
                    </thead>
                    {ListStaffs.data &&
                        ListStaffs.data.map(staffs => {
                            return (
                                <RowTableStaffs
                                    link={"/manager/staffs/" + staffs._id}
                                    key={staffs._id}
                                    number={staffs.index + 1}
                                    type={staffs.name}
                                    birthday={staffs.birthday}
                                    phone={staffs.phone}
                                    techStack={staffs.techStack}
                                    projectJoin={staffs.projectJoin}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListStaffs.totalPage}
                    onChange={handelChangePage}
                />
            </div>
        </div>
    );
};