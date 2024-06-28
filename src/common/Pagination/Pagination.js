import { useEffect, useState } from "react";
import "./Pagination.style.css";

const Pagination = ({ page, totalPage, displayPage, setPage }) => {
  const [group, setGroup] = useState(1); //현제 보여주는 페이지 그룹
  const noPrev = group === 1; // 이전 페이지가 없는 경우
  const noNext = group + displayPage - 1 >= totalPage; // 다음 페이지가 없는 경우

  const selectPage = (index) => {
    setPage(index);
  };
  const preGroup = () => {
    setPage((prev) => Math.max(1, prev - displayPage));
  };

  const nextGroup = () => {
    setPage((prev) => Math.min(totalPage, prev + displayPage));
  };

  useEffect(() => {
    const newGroup = Math.floor((page - 1) / displayPage) * displayPage + 1;
    setGroup(newGroup);
  }, [page, displayPage]);

  return (
    <div className="layout">
      <ul className="ul">
        <li className={`arrow li ${noPrev && "invisible"}`}>
          <div
            onClick={() => {
              preGroup();
            }}
          >
            이전
          </div>
        </li>
        {/*한번에 보여줄 페이지 갯수만큼 어레이 생성*/}
        {Array(displayPage)
          .fill() //배열 생성 및 초기화
          .map((_, index) => (
            <div key={index}>
              {group + index <= totalPage && (
                <li
                  className={`li ${group + index === page && "active"}`}
                  onClick={() => selectPage(group + index)}
                  key={group + index}
                >
                  {group + index}
                </li>
              )}
            </div>
          ))}
        <li className={`arrow li ${noNext && "invisible"}`}>
          <div
            onClick={() => {
              nextGroup();
            }}
          >
            다음
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
