import { Spin } from "antd";
import React from "react";

// const Loading = ({ children, isLoading, delay = 200 }) => {
//     return (
//         <Spin spinning={isLoading} delay={delay}>
//             {children}
//         </Spin>
//     );  
// };

// export default Loading

const Loading = ({ children, isLoading, delay = 200 }) => {
    
    if (!isLoading) {
        
        return <>{children}</>;
    }

    return (
        <Spin spinning={isLoading} delay={delay}>
            {children}
        </Spin>
    );
};

export default Loading;


// const Loading = ({ children, isLoading, delay = 200 }) => {
//     if (!isLoading) {
//         // Nếu không đang tải, chỉ trả về nội dung con
//         return <>{children}</>;
//     }

//     // Nếu đang tải, hiển thị spinner và nội dung con bên trong
//     return (
//         <div style={{ position: 'relative', minHeight: '100px' }}>
//             <Spin spinning={isLoading} delay={delay} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//                 {children}
//             </Spin>
//             {isLoading && <div style={{ visibility: 'hidden' }}>{children}</div>}
//         </div>
//     );
// };

// export default Loading;