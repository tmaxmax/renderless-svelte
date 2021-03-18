import Accordion from './Accordion.svelte'
import AccordionGroup from './AccordionGroup.svelte'
import Carousel from './Carousel.svelte'
import Notification, { notifications } from './Notifications.svelte'
import Modal, { closeModal, openModal } from './Modal.svelte'
import TabControl from './TabControl.svelte'
import TabControlItem from './TabControlItem.svelte'
import Tooltip, { tooltip } from './Tooltip.svelte'

/**
 * @deprecated Use `Accordion` instead.
 */
const Accordeon = Accordion
/**
 * @deprecated Use `AccordionGroup` instead.
 */
const AccordeonGroup = AccordionGroup

export {
  Accordion,
  AccordionGroup,
  Carousel,
  closeModal,
  Modal,
  Notification,
  notifications,
  openModal,
  TabControl,
  TabControlItem,
  Tooltip,
  tooltip,
  /* Deprecated */
  Accordeon,
  AccordeonGroup,
}

export const Renderless = {
  Accordion,
  AccordionGroup,
  Carousel,
  closeModal,
  Modal,
  Notification,
  notifications,
  openModal,
  TabControl,
  TabControlItem,
  Tooltip,
  tooltip,

  /* Deprecated */
  Accordeon,
  AccordeonGroup,
}
