'use strict';

exports.handler = async function() {
  return {
    statusCode: 501,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ ok: false, message: 'awara-milost-daily pending v260 implementation' })
  };
};
