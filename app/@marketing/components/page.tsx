/* eslint-disable */
import React from "react";

import { AttachFileButton } from "../../../components/AttachFile/AttachFileButton";
import { AttachFileText } from "../../../components/AttachFile/AttachFileText";
import { AttachInvoiceButton } from "../../../components/AttachInvoice/AttachInvoiceButton";
import { AttachInvoiceText } from "../../../components/AttachInvoice/AttachInvoiceText";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Flex } from "../../../components/Flex";
import { Grid } from "../../../components/Grid";
import { Group } from "../../../components/Group";
import { Header } from "../../../components/Header";
import { AddIcon } from "../../../components/Icon/AddIcon";
import { ArrowForwardIcon } from "../../../components/Icon/ArrowForwardIcon";
import { AttachmentIcon } from "../../../components/Icon/AttachmentIcon";
import { BedIcon } from "../../../components/Icon/BedIcon";
import { CalendarIcon } from "../../../components/Icon/CalendarIcon";
import { ChatIcon } from "../../../components/Icon/ChatIcon";
import { CircleCheckIcon } from "../../../components/Icon/CircleCheckIcon";
import { CircleErrorIcon } from "../../../components/Icon/CircleErrorIcon";
import { CircleXIcon } from "../../../components/Icon/CircleXIcon";
import { CycleIcon } from "../../../components/Icon/CycleIcon";
import { DashboardIcon } from "../../../components/Icon/DashboardIcon";
import { DeleteIcon } from "../../../components/Icon/DeleteIcon";
import { DownIcon } from "../../../components/Icon/DownIcon";
import { DownloadDisabledIcon } from "../../../components/Icon/DownloadDisabledIcon";
import { DownloadIcon } from "../../../components/Icon/DownloadIcon";
import { DraftIcon } from "../../../components/Icon/DraftIcon";
import { EditIcon } from "../../../components/Icon/EditIcon";
import { EventIcon } from "../../../components/Icon/EventIcon";
import { FilesIcon } from "../../../components/Icon/FilesIcon";
import { ForumIcon } from "../../../components/Icon/ForumIcon";
import { GroupIcon } from "../../../components/Icon/GroupIcon";
import { HeartIcon } from "../../../components/Icon/HeartIcon";
import { ImageIcon } from "../../../components/Icon/ImageIcon";
import { InboxIcon } from "../../../components/Icon/InboxIcon";
import { LeftIcon } from "../../../components/Icon/LeftIcon";
import { LockLockedIcon } from "../../../components/Icon/LockLockedIcon";
import { LockUnlockedIcon } from "../../../components/Icon/LockUnlockedIcon";
import { MenuIcon } from "../../../components/Icon/MenuIcon";
import { MoreIcon } from "../../../components/Icon/MoreIcon";
import { MoreVerticalIcon } from "../../../components/Icon/MoreVerticalIcon";
import { PaidDocumentIcon } from "../../../components/Icon/PaidDocumentIcon";
import { PersonIcon } from "../../../components/Icon/PersonIcon";
import { QuoteIcon } from "../../../components/Icon/QuoteIcon";
import { RemoveIcon } from "../../../components/Icon/RemoveIcon";
import { RightIcon } from "../../../components/Icon/RightIcon";
import { SaveIcon } from "../../../components/Icon/SaveIcon";
import { SearchIcon } from "../../../components/Icon/SearchIcon";
import { SendIcon } from "../../../components/Icon/SendIcon";
import { SettingsIcon } from "../../../components/Icon/SettingsIcon";
import { ShareIcon } from "../../../components/Icon/ShareIcon";
import { SignOutIcon } from "../../../components/Icon/SignOutIcon";
import { TextDocumentIcon } from "../../../components/Icon/TextDocumentIcon";
import { UploadIcon } from "../../../components/Icon/UploadIcon";
import { VisibilityIcon } from "../../../components/Icon/VisibilityIcon";
import { WarningIcon } from "../../../components/Icon/WarningIcon";
import { ZipFileIcon } from "../../../components/Icon/ZipFileIcon";
import { InfoPanel } from "../../../components/InfoPanel";
import { Input } from "../../../components/Input";
import { InvoiceChip } from "../../../components/InvoiceChip";
import { Panel } from "../../../components/Panel";
import { Stack } from "../../../components/Stack";
import { Text } from "../../../components/Text";
import { Invoice } from "../../../data/invoices/getInvoice";
import { StaticPageContainer } from "../StaticPageContainer";

const ICONS = [
  AddIcon,
  ArrowForwardIcon,
  AttachmentIcon,
  BedIcon,
  CalendarIcon,
  ChatIcon,
  CircleCheckIcon,
  CircleErrorIcon,
  CircleXIcon,
  CycleIcon,
  DashboardIcon,
  DeleteIcon,
  DownIcon,
  DownloadDisabledIcon,
  DownloadIcon,
  DraftIcon,
  EditIcon,
  EventIcon,
  FilesIcon,
  ForumIcon,
  GroupIcon,
  HeartIcon,
  ImageIcon,
  InboxIcon,
  LeftIcon,
  LockLockedIcon,
  LockUnlockedIcon,
  MenuIcon,
  MoreIcon,
  MoreVerticalIcon,
  PaidDocumentIcon,
  PersonIcon,
  QuoteIcon,
  RemoveIcon,
  RightIcon,
  SaveIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShareIcon,
  SignOutIcon,
  TextDocumentIcon,
  UploadIcon,
  VisibilityIcon,
  WarningIcon,
  ZipFileIcon,
];

export const runtime = "edge";

const MOCK_INVOICE: Invoice = {
  id: "123",
  amount: 123,
  createdAt: Date.now(),
  description: "Some Description",
  dueBy: Date.now() + 1000 * 60 * 60 * 24,
  identifier: "123",
  isPaid: 0,
  payee: null,
  fileId: null,
  status: "final",
  strataId: "123",
  type: "incoming",
  updatedAt: Date.now(),
};

export default async function Page() {
  return (
    <StaticPageContainer>
      <Stack gap="large" w="full">
        <Stack>
          <Header as="h2">Core</Header>
          <Panel>
            <Stack>
              <Header as="h3">visibleFrom</Header>
              <Flex justify="stretch" from="tablet">
                <InfoPanel level="success" visibleFrom="mobile">
                  mobile
                </InfoPanel>
                <InfoPanel level="success" visibleFrom="mobilePlus">
                  mobilePlus
                </InfoPanel>
                <InfoPanel level="success" visibleFrom="tablet">
                  tablet
                </InfoPanel>
                <InfoPanel level="success" visibleFrom="tabletPlus">
                  tabletPlus
                </InfoPanel>
                <InfoPanel level="success" visibleFrom="desktop">
                  desktop
                </InfoPanel>
              </Flex>
            </Stack>
          </Panel>
          <Panel>
            <Stack>
              <Header as="h3">visibleOn</Header>
              <Flex justify="stretch" from="tablet">
                <InfoPanel level="success" visibleOn="mobile">
                  mobile
                </InfoPanel>
                <InfoPanel level="success" visibleOn="mobilePlus">
                  mobilePlus
                </InfoPanel>
                <InfoPanel level="success" visibleOn="tablet">
                  tablet
                </InfoPanel>
                <InfoPanel level="success" visibleOn="tabletPlus">
                  tabletPlus
                </InfoPanel>
                <InfoPanel level="success" visibleOn="desktop">
                  desktop
                </InfoPanel>
              </Flex>
            </Stack>
          </Panel>
        </Stack>

        <Stack>
          <Header as="h2">Headers</Header>
          <Header as="h1">Header (h1)</Header>
          <Header as="h2">Header (h2)</Header>
          <Header as="h3">Header (h3)</Header>
          <Header as="h4">Header (h4)</Header>
          <Header as="h5">Header (h5)</Header>
          <Header as="h6">Header (h6)</Header>
        </Stack>

        <Stack>
          <Header as="h2">Attach File Button</Header>
          <AttachFileButton fullWidth={false} />
          <AttachFileButton
            selectedFile={{
              id: "test",
              name: "Test File",
              path: "/something.jpg",
            }}
          />
        </Stack>

        <Stack>
          <Header as="h2">Attach File Text</Header>
          <AttachFileText />
          <AttachFileText
            selectedFile={{
              id: "test",
              name: "Test File",
              path: "/something.jpg",
            }}
          />
        </Stack>

        <Stack>
          <Header as="h2">Attach Invoice Button</Header>
          <AttachInvoiceButton />
          <AttachInvoiceButton
            selectedInvoice={
              { id: "Invoice", identifier: "123", amount: 123 } as any
            }
          />
        </Stack>

        <Stack>
          <Header as="h2">Attach Invoice Text</Header>
          <AttachInvoiceText />
          <AttachInvoiceText selectedInvoice={MOCK_INVOICE} />
        </Stack>

        <Stack>
          <Header as="h2">Badge</Header>
          <Group>
            {(["error", "warning", "success", "default"] as const).flatMap(
              (level) => (
                <Badge key={level} level={level}>
                  {level}
                </Badge>
              ),
            )}
          </Group>
        </Stack>

        <Stack>
          <Header as="h2">Button</Header>
          <Grid cols={{ base: 1, tablet: 3, desktop: 5 }}>
            {(["primary", "secondary", "tertiary"] as const).flatMap((style) =>
              (
                ["primary", "error", "warning", "success", "default"] as const
              ).flatMap((color) => (
                <Button key={`${style}_${color}`} color={color} style={style}>
                  {style} {color}
                </Button>
              )),
            )}
          </Grid>
          <Grid cols={{ base: 1 }}>
            <Button icon={<AddIcon />} />
          </Grid>
          <Grid cols={{ base: 3 }}>
            <Button color="primary" iconLeft={<AddIcon />}>
              Icon Left
            </Button>
            <Button
              color="primary"
              iconLeft={<AddIcon />}
              iconTextBehaviour="centerGlobal"
            >
              Text Center Global
            </Button>
            <Button
              color="primary"
              iconLeft={<AddIcon />}
              iconTextBehaviour="centerRemainder"
            >
              Text Center Remainder
            </Button>

            <Button color="primary" iconRight={<AddIcon />}>
              Icon Right
            </Button>
            <Button
              color="primary"
              iconRight={<AddIcon />}
              iconTextBehaviour="centerGlobal"
            >
              Text Center Global
            </Button>
            <Button
              color="primary"
              iconRight={<AddIcon />}
              iconTextBehaviour="centerRemainder"
            >
              Text Center Remainder
            </Button>
          </Grid>
        </Stack>

        <Stack>
          <Header as="h2">Icon</Header>
          <Grid cols={{ base: 12 }}>
            {ICONS.map((IconComponent) => (
              <Stack key={IconComponent.name} align="center">
                <IconComponent size="small" />
                <Text fontSize="small">{IconComponent.name}</Text>
              </Stack>
            ))}
          </Grid>
        </Stack>

        <Stack>
          <Header as="h2">InfoPanel</Header>
          <Grid cols={{ base: 1, tablet: 4, desktop: 6 }}>
            {(["error", "warning", "success", "default"] as const).flatMap(
              (level) => (
                <React.Fragment key={level}>
                  <InfoPanel
                    header={<Header as="h3">Error</Header>}
                    level={level}
                  >
                    Lorem Ipsum
                  </InfoPanel>
                  <InfoPanel
                    action={
                      <Button color={level} style="secondary">
                        Action
                      </Button>
                    }
                    header={
                      <Header as="h3" tt="capitalize">
                        {level}
                      </Header>
                    }
                    level={level}
                  >
                    Lorem Ipsum
                  </InfoPanel>

                  <InfoPanel
                    header={<Header as="h3">Error</Header>}
                    level={level}
                  >
                    <Input placeholder="placeholder" label="Input" />
                  </InfoPanel>
                </React.Fragment>
              ),
            )}
          </Grid>
        </Stack>

        <Stack>
          <Header as="h2">Input</Header>
          <Grid cols={{ base: 3 }}>
            <Input placeholder="Placeholder" />
            <Input placeholder="Placeholder" actionRight={<CycleIcon />} />
            <Input
              placeholder="Placeholder"
              actionRight={<CycleIcon />}
              label="Label"
            />
          </Grid>
        </Stack>

        <Stack>
          <Header as="h2">Invoice Chip</Header>
          <InvoiceChip invoice={MOCK_INVOICE} />
        </Stack>
      </Stack>
    </StaticPageContainer>
  );
}
