# Scenario Coverage Map — autenticacion-skarlet-clave

## Fase 1: Skarlet ingresa la clave correcta

- `tiene campo clave con id skarletClave`
- `NO tiene campo nombre (skarletNombre eliminado)`
- `NO tiene campo fecha (skarletFecha eliminado)`
- `POST con clave correcta retorna ok:true y rol festejada`
- `POST con nombre+fecha (viejo esquema) retorna ok:false`

## Fase 2: Skarlet ingresa una clave incorrecta

- `clave incorrecta retorna ok:false`
- `clave vacía retorna ok:false`
- `sin campo clave retorna ok:false`

