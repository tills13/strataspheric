import { s } from "../../sprinkles.css";

import { Invoice } from "../../data";
import { Button } from "../Button";
import { CreateOrUpdateInvoiceForm } from "../CreateOrUpdateInvoiceForm";
import { DividerText } from "../DividerText";
import { Group } from "../Group";
import { Header } from "../Header";
import { RemoveIcon } from "../Icon/RemoveIcon";
import { InvoiceChip } from "../InvoiceChip";
import { InvoiceSelect } from "../InvoiceSelect";
import { Modal } from "../Modal";
import { Stack } from "../Stack";

interface Props {
  close: () => void;
  onSelectInvoice: (invoice: Invoice | undefined) => void;
  selectedInvoice: Invoice;
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
}

export function AttachInvoiceModal({
  close,
  onSelectInvoice,
  selectedInvoice,
  upsertInvoice,
}: Props) {
  console.log(selectedInvoice?.id);
  return (
    <Modal closeModal={close} title="Attach Invoice">
      <Stack>
        {selectedInvoice && <InvoiceChip invoice={selectedInvoice} />}

        <Group>
          <InvoiceSelect
            label="Attach Existing Invoice"
            className={s({ w: "full" })}
            onSelectInvoice={(invoice) => {
              onSelectInvoice(invoice);
              close();
            }}
            value={selectedInvoice?.id || ""}
          />
          {selectedInvoice && (
            <Button
              icon={<RemoveIcon />}
              onClick={() => {
                onSelectInvoice?.(undefined);
                close();
              }}
              size="small"
              style="tertiary"
            />
          )}
        </Group>

        <DividerText>OR</DividerText>

        <CreateOrUpdateInvoiceForm
          onCreateOrUpdateInvoice={(invoice) => {
            onSelectInvoice(invoice);
            close();
          }}
          upsertInvoice={upsertInvoice}
        />
      </Stack>
    </Modal>
  );
}
