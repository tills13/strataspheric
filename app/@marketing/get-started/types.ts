interface BaseStep {
  error?: string;
  lastStep?: GetStartedFormStepName;
}

interface CreateAccountStep extends BaseStep {
  step: "CREATE_ACCOUNT";
}

interface CreateStrataStep extends BaseStep {
  step: "CREATE_STRATA";
}

interface SubmitPaymentStep extends BaseStep {
  step: "SUBMIT_PAYMENT";
  numUnits: number;
  strataId: string;
  strataDomain: string;
  stripeCustomerId: string;
  stripeClientSecret: string;
  stripeSetupIntentId: string;
}

interface SuccessStep {
  step: "SUCCESS";
  redirect: string;
}

export type GetStartedFormStep =
  | CreateAccountStep
  | CreateStrataStep
  | SubmitPaymentStep
  | SuccessStep;

export type GetStartedFormStepName = GetStartedFormStep["step"];
