import React from 'react';
import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableProjectType from "./row-table-project-type";
import { Loading } from '../../../components/loading/loading';
import { useDispatch, useSelector } from "react-redux";
import { getProjectType } from '../../../services/project-type-service';
export const TableProjectType = () => {
    const data = useSelector(state => state.projectType.data);
    const loading = useSelector(state => state.projectType.loading);
    const dispatch = useDispatch();
    const [ListProjectType, setListProjectType] = useState([]);
    const [page, setPage] = useState(1);
    const getDataProjectType = async () => {
        try {
            setListProjectType(data)
        } catch (error) {
            await Alert("GetData failed, try again!", "Notification");
        }
    };
     useEffect(() => {
        getDataProjectType();
    }, [loading])
    useEffect(() => {
        dispatch(getProjectType(page))
    }, [page]);
    const handelChangePage = e => {
        const numberPage = e;
        setPage(numberPage);
    };
    return (
        <div className="h-96 sm:w-full">
              {loading ? (
                <Loading />
            ) : (
            <div className="sm:w-full sm:flex sm:flex-col sm:items-center">
                <table className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12">No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left">Description</th>
                            <th className="pt-5 pb-5 w-1/12 sm:w-2/12">Priority</th>
                            <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
                        </tr>
                    </thead>
                    {ListProjectType &&
                        ListProjectType.map(projectType => {
                            return (
                                <RowTableProjectType
                                    link={"/category/project-type/" + projectType.id}
                                    key={projectType.id}
                                    number={projectType.id}
                                    type={projectType.name}
                                    description={projectType.description}
                                    priority={projectType.priority}
                                    status={projectType.status}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListProjectType.totalPage}
                    onChange={handelChangePage}
                />
            </div>
             )}
        </div>
    );
};
