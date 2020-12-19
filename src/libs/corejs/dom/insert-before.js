
import toFragment from './to-fragment'

export default function insertBefore(item, newItems) {
  item.parentNode.insertBefore(toFragment(newItems), item);
}
