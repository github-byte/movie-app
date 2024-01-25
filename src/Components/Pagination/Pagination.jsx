import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pagination.css";

class Pagination extends Component {
  render() {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {this.props.currPage == 1 ? (
              <li className="page-item  disabled">
                <a className="page-link" href="" style={{ cursor: "pointer", backgroundColor:"black" }}>
                  Previous
                </a>
              </li>
            ) : (
              <li
                className="page-item"
                style={{ cursor: "pointer", backgroundColor: "black" }}
                onClick={this.props.prevPage}
              >
                <a className="page-link" style={{ backgroundColor: "black" }}>Previous</a>
              </li>
            )}

            {this.props.pages.map((pageCount) => {
              return pageCount === this.props.currPage ? (
                <li className="page-item active">
                  <a className="page-link" href="#">
                    {pageCount}
                  </a>
                </li>
              ) : (
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={(e) => {
                      this.props.setPage(e.target.innerText);
                    }}
                  >
                    {pageCount}
                  </a>
                </li>
              );
            })}

            {this.props.currPage > this.props.pages.length ? (
              <li className="page-item disabled">
                <a className="page-link" style={{ cursor: "pointer" }}>
                  Next
                </a>
              </li>
            ) : (
              <li className="page-item" onClick={this.props.nextPage}>
                <a className="page-link" style={{ cursor: "pointer" }}>
                  Next
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
