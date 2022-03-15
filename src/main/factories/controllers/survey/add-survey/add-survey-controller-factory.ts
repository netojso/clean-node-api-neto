import { AddSurveyController } from '../../../../../presentations/controller/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../../presentations/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-survey'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
