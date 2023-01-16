import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { todoApi, useGetTodosQuery } from "../features/todo/todoApi";
import PaginationTable from "./PaginationTable";

const Tables = () => {
  const [tableQueryParams, setTableQueryParams] = useState({
    queryPageIndex: 0,
    queryPageSize: 10,
  });
  const [contentPerPage, setContentPerPage] = useState(10);
  // rtk query initial fetching
  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useGetTodosQuery(
      {
        pageSize: tableQueryParams.queryPageSize,
      },
      { refetchOnMountOrArgChange: true }
    );

  // defining columns of the table
  const columns = useMemo(
    () => [
      {
        id: "userId",
        Header: "User ID",
        accessor: "userId",
      },
      {
        id: "id",
        Header: "ID",
        accessor: "id",
      },
      {
        id: "title",
        Header: "Title",
        accessor: "title",
      },
      {
        id: "completed",
        Header: "Is Completed",
        accessor: (d) => String(d?.["completed"]),
      },
    ],
    []
  );

  // We'll start our table without any data
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [pageCount, setPageCount] = useState(0);
  // const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      // example code provide by react-table
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.
      // Give this fetch an ID
      // const fetchId = ++fetchIdRef.current;
      // Set the loading state
      // setLoading(true);
      // We'll even set a delay to simulate a server here
      // setTimeout(() => {
      //     // Only update the data if this is the latest fetch
      //     if (fetchId === fetchIdRef.current) {
      //         const startRow = pageSize * pageIndex;
      //         const endRow = startRow + pageSize;
      //         setData(serverData.slice(startRow, endRow));
      //         // Your server could send back total page count.
      //         // For now we'll just fake it, too
      //         setPageCount(Math.ceil(serverData.length / pageSize));
      //         setLoading(false);
      //     }
      // }, 1000);

      /*                                                                                                                                                                                                                                                                                       */

      /* my code I need to fetch the api again with changed _limit=pageSize */
      console.log("fetch more called", { pageSize });

      // way-1:
      // dispatch(todoApi.endpoints.getTodos.initiate({ pageSize }));
      // result of way-1: this is not updating the data passed in the PaginationTable

      // way-2:
      // with the help of state
      setContentPerPage(pageSize);
      refetch();
      // result of way-2: this is not updating the data passed in the PaginationTable & reset child state. For 2nd time selecting the same option it works
    },
    [refetch]
  );

  console.log("Data length", data?.length);

  if (!isError && !isSuccess && isLoading) {
    return <p>loading...</p>;
  } else if (isError && !isSuccess && !isLoading) {
    return <p>An error occurred</p>;
  } else if (!isError && isSuccess && !isLoading && data.length === 0) {
    return <div>No Content Found</div>;
  } else if (!isError && isSuccess && !isLoading && data.length > 0) {
    return (
      <>
        <PaginationTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          tableQueryParams={tableQueryParams}
          setPageLimit={(limit) =>
            setTableQueryParams({ ...tableQueryParams, queryPageSize: limit })
          }
        />
        {isFetching && <p>Fetching...</p>}
      </>
    );
  } else return <p>No Condition Matched</p>;
};

export default Tables;
