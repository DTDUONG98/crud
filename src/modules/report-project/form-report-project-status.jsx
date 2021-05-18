import React from 'react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { FormChart } from '../../components/chart/chart'
import axios from 'axios';
import _ from 'lodash';
import { REACT_APP_BASE_URL } from '../../routers/router.type';
const queryString = require("query-string");
export const FormReportProjectStatus = () => {
    const [loading, setLoading] = useState(false);
    const [ListReports, setListReports] = useState([]);
    const { register: dataForm, handleSubmit } = useForm();

    const onSubmit = async dataTime => {
        const projectStatus = []
        console.log('on Submit', dataTime);
        setLoading(true);
          try {
            const response = await axios.post(`${REACT_APP_BASE_URL}reports/projects`,{
                body: {
                    startDate: dataTime.startDate,
                    endDate: dataTime.endDate
                }
            })
            const {data} = _.get(response, 'data', []);
            data.map((item) => {
                projectStatus.push(item.project_status)
            })
            // console.log('projectStatus', projectStatus);
            setListReports(projectStatus)
            setLoading(false);
        } catch (error) {
            console.log('error', error);
            setLoading(false);
        }
    }
    useEffect(() => {
    }, []);
    return (
        <div className="mt-10">
        <div className="flex justify-center">
        <div className="leading-loose w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl flex flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-gray-800 font-medium mb-5 w-full">Departments information.</p>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="startDate">
                Start Date<span className="text-red-600">*</span>
              </label>
              <input
                {...dataForm("startDate", {
                  required: "Required",
                })}
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="startDate"
                name="startDate"
                type="text"
                required
                placeholder="startDate"
              />
            </div>
            <div className="w-1/2 sm:w-full pt-4 pr-4 sm:pr-0">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="endDate">
                End Date<span className="text-red-600">*</span>
              </label>
              <input
                {...dataForm("endDate", {
                  required: "Required",
                })}
                className="w-full px-5 outline-none py-1 text-gray-700 focus:shadow-lg border-indigo-700 border rounded"
                id="endDate"
                name="endDate"
                type="text"
                required
                placeholder="endDate"
              />
               <div className="ml-auto mr-auto sm:mt-4 pt-8 ">
              <div className="m-3">
                <button
                  style={{ outline: "none" }}
                  className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 flex items-center"
                >
                  <span className="mr-1">Add</span>
                  <BsPlus className="text-xl font-bold " />
                </button>
              </div>
              <div className="inline-block mt-2 w-full">
                <FormChart dataChart={ListReports}/>
            </div>
            </div>
            </div>
          </form>
        </div>
      </div>
        </div>
    );
};