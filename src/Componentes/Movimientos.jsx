import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ModificarMovimiento from "./ModificarMovimiento";

export default function Movimientos(props) {
  const [show, setShow] = useState(false);
  const [fechaIng, setFechaIng] = useState();
  const [descripcionIng, setDescripcionIng] = useState();
  const [montoIng, setMontoIng] = useState();
  const [fechaEg, setFechaEg] = useState();
  const [descripcionEg, setDescripcionEg] = useState();
  const [montoEg, setMontoEg] = useState();
  const [naranjaX, setNaranjaX] = useState();
  const [mercadoPago, setMercadoPago] = useState();
  const [sumaIng, setSumaIng] = useState([])
  const [sumaEg, setSumaEg] = useState([])
  const [sumaNarX, setSumaNarX] = useState([])
  const [sumaMP, setSumaMP] = useState([])
  
  useEffect(() => {
    const handlesumar = () => {
      const sumarIng = props.movimientos.map((item) => item.montoIng)
        .reduce((previous, current) => {
          return previous + current;
        }, 0);
      setSumaIng(sumarIng);

      const sumarEg = props.movimientos.map((item) => item.montoEg)
        .reduce((previous, current) => {
          return previous + current;
        }, 0);
      setSumaEg(sumarEg);

      const sumarNarX = props.movimientos.map((item) => item.naranjaX)
        .reduce((previous, current) => {
          return previous + current;
        }, 0);
      setSumaNarX(sumarNarX);

      const sumarMP = props.movimientos.map((item) => item.mercadoPago)
        .reduce((previous, current) => {
          return previous + current;
        }, 0);
      setSumaMP(sumarMP);
 
    };
    handlesumar(); 
  });


  const modalClose = () => {
    setShow(false)
    setFechaIng()
    setDescripcionIng()
    setMontoIng()
    setFechaEg()
    setDescripcionEg()
    setMontoEg()
    setNaranjaX()
    setMercadoPago()
  };
  const modalShow = () => {
    setShow(true)
  };

   async function guardarMovimiento(){
    await axios.post(props.baseUrl+"/movimientos",{
      fechaIng: fechaIng,
      descripcionIng: descripcionIng,
      montoIng: parseInt(montoIng),
      fechaEg: fechaEg,
      descripcionEg: descripcionEg,
      montoEg: parseInt(montoEg),
      naranjaX: parseInt(naranjaX),
      mercadoPago: parseInt(mercadoPago),
    })
    .then(() => {
      alert("Movimiento agregado")
      modalClose()
    })
    .catch(err => console.log(err))
  }

  async function eliminarMovimiento(id){
    if (window.confirm("¿Desea eliminar el registro?")){
      await axios.delete(props.baseUrl+"/movimientos/"+id)
      .then(() => alert("Movimiento eliminado"))
      .catch(err => console.log(err))
    }
  }


  return (
    <div class="container-xxxl">
      <table class="table table-success table-striped table-sm border border-success">
        <thead>
          <tr>
            <th colSpan="3">Total Ingresos</th>
            <th>{sumaIng}</th>
            <th colSpan="2">Total Gastos</th>
            <th>{sumaEg}</th>
            <th>{sumaIng - sumaEg}</th>
            <th>{sumaNarX}</th>
            <th>{sumaMP}</th>
          </tr>
          <tr class="table-group-divider">
            <th scope="col"></th>
            <th scope="col">Fecha</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Fecha</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Total</th>
            <th scope="col">Naranja X</th>
            <th scope="col">Mercado Pago</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {props.movimientos.map((item) => (
            <>
              <tr>
                <td>
                  <div class="btn-group">
                    <button type="button" class="btn btn-danger" onClick={() => eliminarMovimiento(item.id)}>El</button>
                    <ModificarMovimiento item={item} baseUrl={props.baseUrl} />
                  </div>
                </td>
                <th scope="row">{item.fechaIng}</th>
                <td>{item.descripcionIng}</td>
                <td>{item.montoIng}</td>
                <th>{item.fechaEg}</th>
                <td>{item.descripcionEg}</td>
                <td>{item.montoEg}</td>
                <td>{item.montoIng - item.montoEg}</td>
                <td>{item.naranjaX}</td>
                <td>{item.mercadoPago}</td>
              </tr>
            </>
          ))}

          <button type="button" class="btn btn-primary" onClick={modalShow}>
            Nuevo
          </button>

          <Modal show={show} onHide={modalClose} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Nuevo Movimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="input-group mb-3">
                  <input
                    type="date"
                    class="form-control"
                    id="iptFechaIng"
                    placeholder="Fecha Ingreso"
                    onChange={e => setFechaIng(e.target.value)}
                    />
                  <input
                    type="text"
                    class="form-control"
                    id="iptDescripcionIng"
                    placeholder="Descripción"
                    onChange={e => setDescripcionIng(e.target.value)}
                  />
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    id="iptMontoIng"
                    placeholder="Precio"
                    onChange={e => setMontoIng(e.target.value)}
                  />
                  <input
                    type="date"
                    class="form-control"
                    id="iptFechaEg"
                    placeholder="Fecha Egreso"
                    onChange={e => setFechaEg(e.target.value)}
                    />
                  <input
                    type="text"
                    class="form-control"
                    id="iptDescripcionEg"
                    placeholder="Descripción"
                    onChange={e => setDescripcionEg(e.target.value)}
                  />
                <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    id="iptMontoEg"
                    placeholder="Precio"
                    onChange={e => setMontoEg(e.target.value)}
                  />
                <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    id="iptNaranjaX"
                    placeholder="Naranja X"
                    onChange={e => setNaranjaX(e.target.value)}
                  />
                <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    id="iptMercadoPago"
                    placeholder="Mercado Pago"
                    onChange={e => setMercadoPago(e.target.value)}
                  />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" class="btn btn-danger" onClick={modalClose}>
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-success"
                onClick={guardarMovimiento}
              >
                Guardar
              </button>
            </Modal.Footer>
          </Modal>
        </tbody>
      </table>
    </div>
  );
}