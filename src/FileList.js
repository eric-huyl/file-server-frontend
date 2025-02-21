import React, { useEffect, useState } from 'react';

function ItemList() {
  // 设置状态来存储API返回的数据

}

export default FilterableFileList;


function FilterableFileList() {
  const [filterText, setFilterText] = useState('');
  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />
      <FileList
        filterText={filterText}
      />
    </div>
  );
}


function SearchBar({ filterText, onFilterTextChange }) {
}


function FileList({ filterText }) {
  const [files, setFile] = useState([]);
  const [loading, setLoading] = useState(true); // 用于显示加载状态
  const [error, setError] = useState(null); // 用于处理错误
  // 使用useEffect来请求API数据
  useEffect(() => {
    // 定义获取数据的异步函数
    const fetchItems = async () => {
      try {
        // 发起GET请求
        const response = await fetch('/api/files/list');

        // 检查响应是否正常
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // 解析JSON数据
        const data = await response.json();
        console.log(data);
        setFile(data); // 将数据存储到状态
      } catch (err) {
        setError(err.message); // 处理错误
      } finally {
        setLoading(false); // 请求完成，关闭加载状态
      }
    };

    // 调用异步函数
    fetchItems();
  }, []); // 空依赖数组，表示只在组件挂载时调用一次

  // 渲染加载状态、错误信息或数据列表
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const filteredFiles = [];
  files.forEach((file) => {
    if (file.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    filteredFiles.push(
      <p>
        {file.name}
      </p>
    );
  }
  );
  return (
    <div>
      <h2>File List</h2>
      {filteredFiles}
    </div>
  );
}