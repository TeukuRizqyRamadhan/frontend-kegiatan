import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchKegiatan, addKegiatan, deleteKegiatan, editKegiatan } from './store/kegiatanAsync';
import Modal from './components/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const kegiatanList = useSelector((state: RootState) => state.kegiatan.list);
  const loading = useSelector((state: RootState) => state.kegiatan.loading);
  const error = useSelector((state: RootState) => state.kegiatan.error);
  const [newKegiatan, setNewKegiatan] = useState('');
  const [editKegiatanId, setEditKegiatanId] = useState<number | null>(null);
  const [editKegiatanText, setEditKegiatanText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    dispatch(fetchKegiatan());
  }, [dispatch]);

  const handleAddKegiatan = () => {
    dispatch(addKegiatan(newKegiatan))
      .then(() => {
        toast.success('Kegiatan berhasil ditambahkan!');
        setNewKegiatan('');
        closeModal();
      })
      .catch(error => {
        toast.error('Gagal menambahkan kegiatan: ' + error.message);
      });
  };


  const handleDeleteKegiatan = (id: number) => {
    dispatch(deleteKegiatan(id))
      .then(() => {
        toast.success('Kegiatan berhasil dihapus!');
      })
      .catch(error => {
        toast.error('Gagal menghapus kegiatan: ' + error.message);
      });
  };


  const handleEditButtonClick = (id: number, namaKegiatan: string) => {
    setEditKegiatanId(id);
    setEditKegiatanText(namaKegiatan);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleEditKegiatan = () => {
    if (editKegiatanId !== null) {
      dispatch(editKegiatan({ id: editKegiatanId, namaKegiatan: editKegiatanText }))
        .then(() => {
          toast.success('Kegiatan berhasil diubah!');
          setEditKegiatanId(null);
          setEditKegiatanText('');
          closeModal();
        })
        .catch(error => {
          toast.error('Gagal mengubah kegiatan: ' + error.message);
        });
    }
  };

  const openAddModal = () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      handleAddKegiatan();
    } else if (modalType === 'edit') {
      handleEditKegiatan();
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <h1>Daftar Kegiatan</h1>
        <button onClick={openAddModal}>Add Kegiatan</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table className="table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Kegiatan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kegiatanList.map((kegiatan, index) => (
            <tr key={kegiatan.id}>
              <td>{index + 1}</td>
              <td>{kegiatan.namaKegiatan}</td>
              <td className="action-buttons">
                <button onClick={() => handleEditButtonClick(kegiatan.id, kegiatan.namaKegiatan)}>Edit</button>
                <button onClick={() => handleDeleteKegiatan(kegiatan.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave}>
        {modalType === 'add' ? (
          <input
            type="text"
            value={newKegiatan}
            onChange={(e) => setNewKegiatan(e.target.value)}
            placeholder="Tambah Kegiatan Baru"
          />
        ) : (
          <input
            type="text"
            value={editKegiatanText}
            onChange={(e) => setEditKegiatanText(e.target.value)}
            placeholder="Edit Kegiatan"
          />
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default App;
