import { call, put, takeLatest } from "redux-saga/effects";
import {
  addTypeFailure,
  addTypeRequest,
  addTypeSuccess,
  deleteTypeFailure,
  deleteTypeRequest,
  deleteTypeSuccess,
  fetchTypesFailure,
  fetchTypesRequest,
  fetchTypesSuccess,
  fetchTypeByIdRequest,
  fetchTypeByIdSuccess,
  fetchTypeByIdFailure,
  updateTypeFailure,
  updateTypeRequest,
  updateTypeSuccess,
} from "./typeSlice";
import { typeApi } from "./typeApi";

function* fetchTypesSaga(
  action: ReturnType<typeof fetchTypesRequest>
): Generator {
  try {
    const result = yield call(typeApi.fetchTypesApi, action.payload);
    yield put(
      fetchTypesSuccess({
        data: result.data.data,
        totalPages: result.data.data.total_pages,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(fetchTypesFailure());
  }
}

function* fetchTypeByIdSaga(
  action: ReturnType<typeof fetchTypeByIdRequest>
): Generator {
  try {
    const result = yield call(typeApi.fetchTypeByIdApi, action.payload);
    yield put(fetchTypeByIdSuccess(result.data.type));
  } catch (error) {
    yield put(fetchTypeByIdFailure((error as Error).message));
  }
}

function* updateTypeSaga(
  action: ReturnType<typeof updateTypeRequest>
): Generator {
  try {
    const result = yield call(typeApi.updateTypeApi, action.payload);
    yield put(updateTypeSuccess(result.data));
  } catch (error) {
    yield put(updateTypeFailure((error as Error).message));
  }
}

function* addTypeSaga(action: ReturnType<typeof addTypeRequest>): Generator {
  try {
    const result = yield call(typeApi.addTypeApi, action.payload);
    yield put(addTypeSuccess(result.data));
  } catch (error) {
    yield put(addTypeFailure((error as Error).message));
  }
}

function* deleteTypeSaga(
  action: ReturnType<typeof deleteTypeRequest>
): Generator {
  try {
    yield call(typeApi.deleteTypeApi, action.payload);
    yield put(deleteTypeSuccess(action.payload));
  } catch (error) {
    console.error(error);
    yield put(deleteTypeFailure());
  }
}

export function* typeSaga() {
  yield takeLatest(fetchTypesRequest.type, fetchTypesSaga);
  yield takeLatest(deleteTypeRequest.type, deleteTypeSaga);
  yield takeLatest(addTypeRequest.type, addTypeSaga);
  yield takeLatest(fetchTypeByIdRequest.type, fetchTypeByIdSaga);
  yield takeLatest(updateTypeRequest.type, updateTypeSaga);
}
