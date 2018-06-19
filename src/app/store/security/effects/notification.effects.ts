/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as securityActions from '../security.actions';
import {LoginSuccessAction} from '../security.actions';
import {NotificationService, NotificationType} from '../../../sevices/notification/notification.service';

@Injectable()
export class SecurityNotificationEffects {

  @Effect({ dispatch: false })
  loginSuccess$: Observable<Action> = this.actions$
    .ofType(securityActions.LOGIN_SUCCESS)
    .do((action: LoginSuccessAction) => this.notificationService.send({
      type: NotificationType.MESSAGE,
      message: `You are logged in with user '${action.payload.username}'`
    }));

  @Effect({ dispatch: false })
  changePasswordSuccess$: Observable<Action> = this.actions$
    .ofType(securityActions.CHANGE_PASSWORD_SUCCESS)
    .do(() => this.notificationService.send({
      type: NotificationType.MESSAGE,
      message: 'Your password has been changed'
    }));

  constructor(private actions$: Actions, private notificationService: NotificationService) {}
}

