// "use client"
// import React from 'react';
// import useApi from '../../hooks/useApi';

// const ExampleComponent = () => {
//   const { data, error, loading, refetch } = useApi('http://172.29.3.110:8098/swagger/index.html', {
//     method: 'GET',
//     immediate: true,
//   });

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//       <button onClick={refetch}>Refetch Data</button>
//     </div>
//   );
// };

// export default ExampleComponent;