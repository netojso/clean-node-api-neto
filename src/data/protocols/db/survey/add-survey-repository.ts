import { AddSurveyModel } from '@/data/usecases/add-survey/db-add-survey-protocols'

export interface AddSurveyRepository {
  add: (account: AddSurveyModel) => Promise<void>
}
