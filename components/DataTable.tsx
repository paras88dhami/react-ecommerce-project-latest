import {
  ColumnDef, getCoreRowModel, useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";


interface DataTableProps<t>{
  data:t[];
  columns:ColumnDef<t,any>[];

}

export const DataTable=<T,>({data,columns}: DataTableProps<T>)=>{
  const table=useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
  });


  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="min-w-full mx-3 mb-5 border-2 border-gray-500">
        <View className="flex-row border-b border-gray-300 pb-3 bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <Text
                key={header.id}
                className="p-2 text-center font-bold text-gray-900 min-w-[100px]"
              >
                {header.column.columnDef.header as string}
              </Text>
            ))
          )}
        </View>

        <FlatList
          data={table.getRowModel().rows}
          keyExtractor={(row) => row.id}
          renderItem={({ item, index }) => (
            <View
              className={`flex-row border-b border-green-300 ${
                index % 2 === 0 ? "bg-slate-400" : "bg-gray-300"
              }`}
            >
              {item.getVisibleCells().map((cell: any) => (
                <Text
                  key={cell.id}
                  className="p-2 text-center text-gray-800 min-w-[100px]"
                >
                  {cell.renderValue()}
                </Text>
              ))}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

