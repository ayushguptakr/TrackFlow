import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  variant = 'danger',
}) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    description={message}
    size="sm"
    footer={
      <>
        <Button type="button" variant="secondary" className="!w-auto sm:min-w-[100px]" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={variant === 'danger' ? 'danger' : 'primary'}
          className="!w-auto sm:min-w-[100px]"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </>
    }
  />
);

export default ConfirmDialog;
