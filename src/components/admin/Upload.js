/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { uploadMap, submitMap } from "../../store/actions/index";
import axios from "axios";
import config from "../../config";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#6c747d"
  }
};

const floor = ['first','second','third','fourth','fifth','sixth','seventh','eight','ninth','tenth']

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      floor: null,
      modalIsOpen: false,
      imgUrl: "",
      fileName: null,
      loaded: 0,
      uname:null,
      showImage:false
    };
  }

  componentDidMount() {
    this.setState({
      selectedFile: null,
      fileName: "",
      modalIsOpen: true,
      uname: this.props.user.firstname + this.props.user.lastname

    });
  }

  checkMimeType = event => {
    let files = event.target.files;
    let err = [];
    const types = ["image/png", "image/jpeg", "image/gif"];
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  openModal = ()=> {
    this.setState({ modalIsOpen: true });
  }

  closeModal = ()=> {
    this.setState({ modalIsOpen: false });
    this.props.hide(false)
  }

  checkFileSize = event => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
  };

  onChangeHandler = event => {
    var files = event.target.files;
      this.setState({
        selectedFile: files,
        fileName:files[0].name,
      });
    const data = new FormData();
    data.append("file", files[0]);
    data.append("filename", files[0].name);

    axios
      .post(config.uploadMap, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        this.setState({
          imgUrl: `${config.editImg}${res.data.file}`,
          showImage:true
        });
        // toast.success("upload success");
      })
      .catch(err => {
        toast.error("upload fail");
      });
  };

  onClickHandler = (e) => {
    e.preventDefault();
    let data = {
      username: this.state.userName,
      buildingName: this.props.bName,
      floor: this.state.floor,
      fileName: this.state.fileName,
    }
    this.props.submitMap(data, () => {
      let err = Object.keys(this.props.resp);
      if(err[0] === 'error'){
        toast.error(`${this.props.resp.error}`)
      }else{
        this.props.history.push({
          pathname: '/annotate',
          search: `?query=${this.props.bName}&&floor:${this.state.floor}&&fileName:${this.state.fileName}`,
      })}
    })
  };

  handleFloor = (e) => {
    e.preventDefault();
    this.setState({
      floor: e.target.value
    })
  }

  componentWillMount() {
    this.setState({
      selectedFile: null
    });
  }

  handleUploadImage = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);
    // this.setState({ imageURL: `http://localhost:500/${body.file}` });
  };

  handleFloor = e => {
    this.setState({
      floor: e.target.value
    });
  };

  render() {
    let { imgUrl } = this.state;

    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="card" style={{width: "18rem"}}>
          <div class="card-body">
            <h5 class="card-title">Upload Image</h5>
            <form onSubmit={this.onClickHandler}>
            <div className="d-flex-column justify-content-center">
              <div className="d-flex justify-content-center" >
                  <button type="button" class="btn btn-warning mb-3">
                    <label class="file-label mt-2">
                  <input
                    type="file"
                    multiple
                    onChange={this.onChangeHandler}
                    id="fileUpload"
                    class="file-input"
                    name="myimage"
                    required
                  />
                      <span class="badge badge-white">
                          <i class="text-white h3 fas fa-file-upload" />
                      </span>
                      </label>
                  </button>
                </div>
          
                {this.state.showImage ?   
                <div className="d-flex justify-content-center">
                <img
                src={imgUrl}
                className="img-responsive"
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  width: "40%",
                  height: "40%%"
                }}
                alt="map image"
              />
              </div>
              : null}
</div>
                  <select
                      className="form-control mb-2"
                      id="exampleFormControlSelect2"
                      value={this.state.floor}
                      onChange={this.handleFloor}
                    >
                      <option value="none" selected disabled hidden>
                        Select Floor Number
                      </option>
                      {floor.map((l, i) => {
                        return (
                          <option value={l} key={i}>
                            {l}
                          </option>
                        );
                      })}
                    </select>
              <button
                type="submit"
                class="btn btn-success btn-block"
              >
                Upload
              </button>
              </form>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    uploadImg: state.uploadImg,
    user: state.users,
    resp: state.adminMaps
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { uploadMap, submitMap }
  )(Upload)
);
