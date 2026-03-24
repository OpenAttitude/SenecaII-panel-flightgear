import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { isInstrumentId, type InstrumentId } from '@/instrumentIds';

const panelProps = (route: { query: Record<string, unknown> }) => ({
  fgfs: route.query.fgfs as string | undefined,
  dpi: route.query.dpi as string | undefined,
  gradient: route.query.gradient as string | undefined,
});

const instrumentProps = (route: { params: Record<string, unknown>; query: Record<string, unknown> }) => ({
  instrumentId: route.params.instrumentId as InstrumentId,
  fgfs: route.query.fgfs as string | undefined,
  dpi: route.query.dpi as string | undefined,
  gradient: route.query.gradient as string | undefined,
});

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'panel',
    component: () => import('./views/Panel.vue'),
    props: panelProps,
  },
  {
    path: '/instrument/:instrumentId',
    name: 'instrument',
    component: () => import('./views/InstrumentFullscreenView.vue'),
    props: instrumentProps,
    beforeEnter: (to, _from, next) => {
      const raw = to.params.instrumentId;
      const id = Array.isArray(raw) ? raw[0] : raw;
      if (!isInstrumentId(id)) {
        next({ name: 'panel', query: to.query });
        return;
      }
      next();
    },
  },
  { path: '/ClockView', redirect: (to) => ({ name: 'instrument', params: { instrumentId: 'clock' }, query: to.query }) },
  {
    path: '/test',
    name: 'test',
    component: () => import('./views/TestView.vue'),
  },
  {
    path: '/testbeds',
    name: 'testbeds',
    component: () => import('./views/TestbedHubView.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./views/PanelSettingsView.vue'),
    props: panelProps,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
