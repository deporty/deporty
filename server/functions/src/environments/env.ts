import { ServiceAccount } from "firebase-admin";

export const env = {
  bucketName: 'deporty-dev.appspot.com',
  credentials: {
    type: 'service_account',
    project_id: 'deporty-dev',
    private_key_id: 'c2bb345a403e7dc54d19c964a9fb4103a5cf5675',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxWuyn6+scYCBT\nT7m/jjJtTg0Vst/0Bkzc3iK4rY8K3DGsofGk6FrYv+BsUGGzJ3qQgD7f8cwOzaEH\nJ9cBsSD0XtuZKYeyfegUuGLj+o80+FZFVRtw6oYEw4+Kt6SoM2XhZVi2KH8NzCUR\n56xzkCmxT3N889T1vRzlu0p2VuPwOxy3dkIRuxkwt/HwpXTJT11WMwpNBGlXdCPh\nwwtxnKY9dA8cf9LdM05Uzf+V/9qoYGIHy0mb1Ri4bPuzi2/oLG4pENn5Vp/PyH7x\nSRs/O48DSWyZajAwsBGBDg9nyOlslGD2xxXG4TEnhXGsWmCagCJb15qyV7l7onmn\ncrhzirUbAgMBAAECggEASnaefjJzWEqTx+blWiPd0D7BB6c+mDo8807gzSExuaGR\nyaWEy3QzEGYfV9q36nxc3Wa6/1OKFX0IavSzNSala3SYRspFCxAJ7QktnAKLNfY+\nYoXFK7eL5VwmXFuWaniKAgSHJpQCJEzeE5JtuWeB2cw99Ox7MWHhTCNCtETvFuFH\nFQs5okQzZ22USkAQBaRZrtVMJGcV2ObQWuu7M7PIJKi7bFVIaDsG9cWx56kJaAqu\nFyI7sNAeBhcic+ZnJYuMQluWxJMvVog70qHx5XAf/jCCmS5wP1wQZalEM7AAO7I/\nC/SocXdvQawz3UxKRJJ4etViqyrDWDl73ftmzDL14QKBgQDpb8GXtBtJQtYQrR+0\n6QpSSnH8XP+R21hXKNJdh3KLSqY/0cK9Uv+y8s432iR/5pANvGE/98m9FSlvXJ7j\nwcuHEmH7ydfg0hoiZeqjfVB6e2b1KaoBaEm7qfDkXwXVGabxR0XW5z2a6zyBUXjS\nFeNvAdm8njw4VjfBuxUF8JfiLQKBgQDCf3gXnT6N/Pt8fOd9zdhO29TAJJxI4M4y\nATXXfSKD0L6NCjOksNXx79F89PQ9wb0Rxmfj4HIU1bda9vB2wH8tvdpchyegkg9l\nQ2Ea6ZuJ/wEWQNA1gH9+phYxDdvKaxgPDkGaz7ZWGq9gbodtPXNh6eIz9weItc1f\nsTOQIPupZwKBgADrQbXZLapSKwmRxOgvaqz8QgqeSxtF48kkDf/0Qo0t1A24Q63/\nH6aSsiEiKLagL7z+Gtvnm9G0vZ8EnFOFNcnoVp5pIwJtkVDFWfEe0yxIRBV+/n5W\n7MNiXeJoRVubaD7W6v13l5R+jJRtv64EDAsp1LObY91M6ZdHp0OIuPBZAoGBALSc\nni5/jKlZtUdCzczbK/T+2q+az641ZAS3bwIuZ7C0VV6vjIlw1RuXsZcx+OSoViR9\nc9f+grGqTFwiV+ZOl0sos++cakYHnFhSm4fcSt14ec/qW+5y5vH61Ty0O9faXzsL\n6AwUuqN2oEkSGpxspgrUn4PV758aBB7KdLFwj4IdAoGAUZLbmGM2kqvgXL4liDrE\nm9m4ja/QqC8livPMcnxRV5CgQ1tKRXQ2NhVL0qrPXksLdgPZqoJMAVwDaNA28g9H\nP375JTKNYNc7EtUlsDxlqlmVz0dSLQiQVYi6LTVLxpYjQRlI07AdtnPNSzGZ5Z+L\nRoA7lIESJl6IlDoUcZuT2Dg=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-3xwyj@deporty-dev.iam.gserviceaccount.com',
    client_id: '115384576251009564647',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3xwyj%40deporty-dev.iam.gserviceaccount.com',
  } as ServiceAccount,
};
